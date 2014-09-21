/*global describe, it*/
'use strict';

var fs = require('fs'),
  es = require('event-stream'),
  should = require('should');

require('mocha');

delete require.cache[require.resolve('../')];

var gutil = require('gulp-util'),
  plugin = require('../');

describe('gulp-weibo-dot2js', function() {

  var expectedFile = new gutil.File({
    path: 'test/expected/basic.txt',
    cwd: 'test/',
    base: 'test/expected',
    contents: fs.readFileSync('test/expected/basic.txt')
  });

  it('Basic Test', function(done) {

    var srcFile = new gutil.File({
      path: 'test/fixtures/basic.txt',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/basic.txt')
    });

    var stream = plugin();

    stream.on('error', function(err) {
      should.exist(err);
      done(err);
    });

    stream.on('data', function(newFile) {

      should.exist(newFile);
      should.exist(newFile.contents);

      String(newFile.contents).should.equal(String(expectedFile.contents));
      done();
    });

    stream.write(srcFile);
    stream.end();
  });

  it('Template compressionSpace Option Test', function(done) {

    var srcFile = new gutil.File({
      path: 'test/fixtures/compressionSpace.txt',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/compressionSpace.txt')
    });

    var expectedFile = new gutil.File({
      path: 'test/expected/compressionSpace.txt',
      cwd: 'test/',
      base: 'test/expected',
      contents: fs.readFileSync('test/expected/compressionSpace.txt')
    });

    var stream = plugin({
      compressionSpace: true
    });

    stream.on('error', function(err) {
      should.exist(err);
      done(err);
    });

    stream.on('data', function(newFile) {

      should.exist(newFile);
      should.exist(newFile.contents);

      String(newFile.contents).should.equal(String(expectedFile.contents));
      done();
    });

    stream.write(srcFile);
    stream.end();
  });

  it('Template Util Function Test', function(done) {

    var srcFile = new gutil.File({
      path: 'test/fixtures/basic.txt',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/basic.txt')
    });

    var expectedFile = new gutil.File({
      path: 'test/expected/tplFunc.txt',
      cwd: 'test/',
      base: 'test/expected',
      contents: fs.readFileSync('test/expected/tplFunc.txt')
    });

    var stream = plugin({
      tplFunc: './tplFunc'
    });

    stream.on('error', function(err) {
      should.exist(err);
      done(err);
    });

    stream.on('data', function(newFile) {

      should.exist(newFile);
      should.exist(newFile.contents);

      String(newFile.contents).should.equal(String(expectedFile.contents));
      done();
    });

    stream.write(srcFile);
    stream.end();
  });

  it('Template Include Test', function(done) {

    var srcFile = new gutil.File({
      path: 'test/fixtures/include.txt',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/include.txt')
    });

    var expectedFile = new gutil.File({
      path: 'test/expected/include.txt',
      cwd: 'test/',
      base: 'test/expected',
      contents: fs.readFileSync('test/expected/include.txt')
    });

    var stream = plugin();

    stream.on('error', function(err) {
      should.exist(err);
      done(err);
    });

    stream.on('data', function(newFile) {

      should.exist(newFile);
      should.exist(newFile.contents);

      String(newFile.contents).should.equal(String(expectedFile.contents));
      done();
    });

    stream.write(srcFile);
    stream.end();
  });

  it('Error Handing Test', function(done) {

    var srcFile = new gutil.File({
      path: 'test/fixtures/basic.txt',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.createReadStream('test/fixtures/basic.txt')
    });

    var stream = plugin();

    stream.on('error', function(err) {
      should.exist(err);
      done();
    });

    stream.on('data', function(newFile) {
      newFile.contents.pipe(es.wait(function(err, data) {
        done(err);
      }));
    });

    stream.write(srcFile);
    stream.end();
  });
});