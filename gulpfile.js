var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  cleancss = require('gulp-clean-css'),
  connect = require('gulp-connect'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename');

var jsSource = ['src/js/*.js'],
  sassSource = ['src/*.scss'],
  htmlSource = ['src/*.html'];


gulp.task('log', function () {
  return gutil.log('Initializing gulp...');
});

gulp.task('copy', function () {
  return gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('sass', function () {
  return gulp.src(sassSource)
    .pipe(sass({ style: 'expanded' }))
    .on('error', gutil.log)
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('minify', ['sass'], function () {
  return gulp.src('dist/css/style.css')
    .pipe(cleancss({ compatibility: 'ie8' }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('js', function () {
  return gulp.src(jsSource)
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src(htmlSource)
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
});

gulp.task('connect', function () {
  return connect.server({
    root: './dist',
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(jsSource, ['js']);
  gulp.watch(sassSource, ['minify']);
  gulp.watch(htmlSource, ['html']);
});

gulp.task('default', ['copy', 'js', 'minify', 'html', 'connect', 'watch']);