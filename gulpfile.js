'use strict';

var
gulp = require('gulp'),
minifyCss = require('gulp-minify-css'),
concat = require('gulp-concat'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
replace = require('gulp-replace'),
uglify = require('gulp-uglify'),
zip = require('gulp-zip'),
argv = require('yargs').argv;

gulp.task('script', function() {
  gulp.src('./scripts/**/*.js')
    .pipe(concat('/cb-child-main-script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  var version = argv.version ? argv.version.replace(/-/g , '.') : 'No Version Number Given';
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'IE 8']
    }))
    .pipe(concat('style.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(replace('/*!', '/*'))
    .pipe(replace('VERSION_NUMBER', version))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  gulp.watch('./scripts/**/*.js', ['script']);
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['script', 'sass', 'watch']);

gulp.task('zip', function() {
    return gulp.src([
      'library',
      'cb-child-main-script.js',
      'functions.php',
      'screenshot.png',
      'style-rtl.css',
      'style.css'
    ], {base: '.'})
    .pipe(zip('study-breaks-15zine-child-'+argv.version+'.zip', {compress:false}))
    .pipe(gulp.dest('../../../../theme-files/'));
});

/*
  To build zip file run:
  gulp build --version <3-digit-version-number>
  EXAMPLE:
  gulp build --version 0-0-1
*/
gulp.task('build', ['script', 'sass', 'zip']);
