'use strict';

const { src, dest, watch, parallel } = require('gulp');
const imagemin = require('gulp-imagemin');
const resize = require('gulp-image-resize');
const livereload = require('gulp-livereload');
let sass = require('gulp-sass');
sass.compiler = require('node-sass');

const compile_sass = function() {
  return src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'))
    .pipe(livereload());
}

const compile_js = function() {
  return src('src/js/**/*.js')
    .pipe(dest('dist/js'))
    .pipe(livereload());
}

const reload_html = function() {
  return src('*.html')
    .pipe(livereload());
}

const copy_original_images = function() {
  return src('src/img/*.jpg')
    .pipe(resize({
      width: 3900,
      height: 2600,
      crop: true,
      upscale: false,
    }))
    .pipe(imagemin())
    .pipe(dest('dist/img/original'));
}
const create_thumbs = function() {
  return src('src/img/*.jpg')
    .pipe(resize({
      width: 1200,
      height: 1200,
      crop: true,
      upscale: false,
    }))
    .pipe(imagemin())
    .pipe(dest('dist/img/thumb'));
}

// Lazy, i know, i would normally import & compile it into index.js
const copy_photoswipe = function() {
  src('node_modules/photoswipe/dist/photoswipe*min.js').pipe(dest('dist/js'));
  src('node_modules/photoswipe/src/css/default-skin/default-skin.png').pipe(dest('dist/img'));
  src('node_modules/photoswipe/src/css/default-skin/default-skin.svg').pipe(dest('dist/img'));
  src('node_modules/photoswipe/src/css/default-skin/preloader.gif').pipe(dest('dist/img'));
}

exports.default = () => {
  copy_original_images();
  create_thumbs();
  copy_photoswipe();
  compile_sass();
  compile_js();
  watch('src/sass/**/*.scss', compile_sass);
  watch('src/js/**/*.js', compile_js);
  watch('*.html', reload_html);
  livereload.listen();
}
