var through = require('through2'),
  gutil = require('gulp-util'),
  doT = require('./lib/doT');

module.exports = function(options) {
  'use strict';

  var pluginName = 'gulp-weibo-dot2js';
  var INCLUDE_PATTERN = /(['"])Weibo_Multi_Template_Engine_Include_id\:(.)+?\:(.)+?\1/g;

  // if necessary check for required param(s), e.g. options hash, etc.
  // if (!param) {
  //  throw new gutil.PluginError(pluginName, 'No param supplied');
  // }
  // 
  options = options || {};

  // see 'Writing a plugin'
  // https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md
  function pluginDemo(file, enc, callback) {
    /*jshint validthis:true*/

    // Do nothing if no contents
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {

      // http://nodejs.org/api/stream.html
      // http://nodejs.org/api/child_process.html
      // https://github.com/dominictarr/event-stream

      // accepting streams is optional
      this.emit('error',
        new gutil.PluginError(pluginName, 'Stream content is not supported'));
      return callback();
    }

    // check if file.contents is a `Buffer`
    if (file.isBuffer()) {

      var func = doT.compile(file.contents, options.compressionSpace).toString();
      func = func.replace(/^function anonymous\(/, 'module.exports = function (');

      // 处理 include
      var incRuleList = func.match(INCLUDE_PATTERN);
      if (incRuleList && incRuleList.length) {
        incRuleList.forEach(function(incRule) {
          incRule = incRule.replace(/['"]+|\\['"]/g, '');
          var arr = incRule.split(':');
          var _path = arr[1];
          var _varname = arr[2];
          func = func.replace(new RegExp('([\'"])' + incRule + '\\1', 'g'), '(function(){var tpl = require(\'' + _path + '\');return tpl(' + _varname + ');})()');
        });
      }

      if (options.tplFunc) {
        func = 'var tplFunc = require(\'' + options.tplFunc + '\');\n' + func;
      }
      // manipulate buffer in some way
      // http://nodejs.org/api/buffer.html
      file.contents = new Buffer(func);

      this.push(file);

    }
    return callback();
  }

  return through.obj(pluginDemo);
};