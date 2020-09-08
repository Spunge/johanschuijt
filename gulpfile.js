'use strict';

const { src, dest, watch } = require('gulp');
const livereload = require('gulp-livereload');
let sass = require('gulp-sass');
sass.compiler = require('node-sass');

const compile_sass = function() {
  return src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'))
    .pipe(livereload());
}

const reload_html = function() {
  return src('*.html')
    .pipe(livereload());
}

const copy_images = function() {
  return src('src/img/*.jpg')
    .pipe(dest('dist/img'));
}

exports.default = () => {
  livereload.listen();
  copy_images();
  watch('src/sass/**/*.scss', compile_sass);
  watch('*.html', reload_html);
}
