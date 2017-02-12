'use strict';
const gulp = require('gulp');
const watch = require('gulp-watch');
const include = require('gulp-include');
const babel = require('gulp-babel');

gulp.task("scripts", function() {
  gulp.src("javascript/main.js")
    .pipe(include())
      .on('error', console.log)
        .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(gulp.dest("../js"));
});

gulp.task('default', ["scripts"], function() {
    gulp.watch('javascript/**/*.js', ["scripts"]);
});
