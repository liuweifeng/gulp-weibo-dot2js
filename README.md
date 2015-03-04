# gulp-weibo-dot2js
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url] ![io.js supported](https://img.shields.io/badge/io.js-supported-green.svg?style=flat)

> A plugin for [gulp](https://github.com/wearefractal/gulp), compiles [doT template](https://github.com/olado/doT) to .js files.

![@貘吃馍香](http://tp1.sinaimg.cn/1660579792/180/5621671207/1)
> Gulp 扩展，根据 [@貘吃馍香](http://weibo.com/itapir) 的 [grunt-brick-compile-template](https://github.com/FlashSoft/grunt-brick-compile-template.git) 迁移而来。为了简单起见，暂时去掉了循环引用判断、include 路径合法性判断等。

## Usage

First, install `gulp-weibo-dot2js` as a development dependency:

```shell
npm install --save-dev gulp-weibo-dot2js
```

Then, add it to your `gulpfile.js`:

```javascript
var dot2js = require("gulp-weibo-dot2js");

gulp.src("./src/tpl/*.html")
	.pipe(dot2js({
		
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### dot2js(options)

#### options.tplFunc
Type: `String`  

The template utils module path

模板工具方法文件路径，编译后会在源文件中被 `require` 进去。

#### options.compressionSpace
Type: `Boolean`  
Default: `false`

Compression spaces in template files

是否去除模板里的空格。默认为否。


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-weibo-dot2js
[npm-image]: https://badge.fury.io/js/gulp-weibo-dot2js.png

[travis-url]: http://travis-ci.org/liuweifeng/gulp-weibo-dot2js
[travis-image]: https://secure.travis-ci.org/liuweifeng/gulp-weibo-dot2js.png?branch=master

[coveralls-url]: https://coveralls.io/r/liuweifeng/gulp-weibo-dot2js
[coveralls-image]: https://coveralls.io/repos/liuweifeng/gulp-weibo-dot2js/badge.png

[depstat-url]: https://david-dm.org/liuweifeng/gulp-weibo-dot2js
[depstat-image]: https://david-dm.org/liuweifeng/gulp-weibo-dot2js.png
