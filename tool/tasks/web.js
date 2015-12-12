var gulp = require('gulp')
var plumber = require('gulp-plumber')
var handlebars = require('gulp-compile-handlebars')
var rename = require('gulp-rename')

var config = require('./config')

var dirs = {
  'dest': './',
  'hbs': './hbs'
}


gulp.task('web', function () {
  var data = {}
  var options = {
    batch: [dirs.hbs + '/partials']
  }

  gulp.src([dirs.hbs + '/index.hbs'])
    .pipe(plumber(config.errorNotify))
    .pipe(handlebars(data, options))
    .pipe(rename(function (path) {
      path.extname = '.html'
    }))
    .pipe(gulp.dest(dirs.dest))

})