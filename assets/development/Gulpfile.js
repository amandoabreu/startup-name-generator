'use strict';
const gulp = require('gulp');
const watch = require('gulp-watch');
const include = require('gulp-include');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify-css');
const concat = require('gulp-concat');
const merge = require('merge-stream');

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR', 'safari > 5', 'IE > 7']
};

gulp.task("scripts", function() {
  gulp.src("javascript/main.js")
    .pipe(include())
      .on('error', console.log)
        .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(gulp.dest("../js"));
});

gulp.task('styles', function() {
    var scssStream = gulp.src(['styles/**/*.scss'])
        .pipe(sass(sassOptions))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(concat('scss-files.css'))

    var cssStream = gulp.src(['css/**/*.css'])
        .pipe(concat('css-files.css'));

    var mergedStream = merge(cssStream, scssStream)
        .pipe(concat('styles.css'))
        .pipe(minify())
        .pipe(gulp.dest('../css'));

    return mergedStream;


});

gulp.task('default', ["scripts", "styles"], function() {
    gulp.watch('javascript/**/*.js', ["scripts"]);
    gulp.watch('styles/**/*.scss', ["styles"]);
});
