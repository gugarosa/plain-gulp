var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var jsSources = ['src/js/*.js'],
    sassSources = ['src/*.scss'],
    htmlSources = ['src/*.html'],
    outputDir = 'dist';


gulp.task('log', function() {
  gutil.log('Initializing gulp...')
});

gulp.task('copy', function() {
  gulp.src('src/*.html')
  .pipe(gulp.dest(outputDir))
  gulp.src('src/fonts/*')
  .pipe(gulp.dest(outputDir + '/fonts'))
});

gulp.task('sass', function() {
  gulp.src(sassSources)
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest(outputDir + '/css'))
  .pipe(connect.reload())
});

gulp.task('js', function() {
  gulp.src(jsSources)
  .pipe(uglify())
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest(outputDir + '/js'))
  .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: './dist',
    livereload: true
  })
});

gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(connect.reload())
});

gulp.task('default', ['copy', 'html', 'js', 'sass', 'connect', 'watch']);