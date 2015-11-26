var gulp = require('gulp');
var zip = require('gulp-zip');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');


var dirs = {
  'dest': './',
  'chrome': './chrome',
  'firefox': './firefox'
};

gulp.task('chrome', function() {
  gulp.src(dirs.chrome)
    .pipe(plumber())
    .pipe(zip('chrome.zip'))
    .pipe(gulp.dest(dirs.dest))
});

gulp.task('firefox', function() {
  gulp.src(dirs.firefox + '/**')
    .pipe(plumber())
    .pipe(zip('firefox.crx'))
    .pipe(gulp.dest(dirs.dest))
});


gulp.task('pkg', shell.task([
  'gulp chrome',
  'gulp firefox'
]))