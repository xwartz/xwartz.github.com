var gulp = require('gulp')
var zip = require('gulp-zip')
var plumber = require('gulp-plumber')

var config = require('./config')

var dirs = {
  'dest': './',
  'chrome': './chrome'
}

gulp.task('chrome', function() {
  gulp.src(dirs.chrome)
    .pipe(plumber(config.errorNotify))
    .pipe(zip('chrome.zip'))
    .pipe(gulp.dest(dirs.dest))
})