var gulp = require('gulp')
var zip = require('gulp-zip')
var plumber = require('gulp-plumber')

var config = require('./config')

var dirs = {
  'dest': './',
  'firefox': './firefox'
}

gulp.task('firefox', function() {
  gulp.src(dirs.firefox)
    .pipe(plumber(config.errorNotify))
    .pipe(zip('firefox.zip'))
    .pipe(gulp.dest(dirs.dest))
})