var gulp = require('gulp');
var zip = require('gulp-zip');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');
var notify = require('gulp-notify');
var handlebars = require('gulp-compile-handlebars');


var plumberErrorHandler = {
    errorHandler: notify.onError({
        message: "Error: <%= error.message %>"
    })
};

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
]));

var hbs = function() {
  var data = {}
  var options = {
    batch: [dirs.hbs]
  }

  return gulp.src([dirs.entry + '/*.hbs'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(handlebars(data, options))
    .pipe(gulp.dest(dirs.dest))

}