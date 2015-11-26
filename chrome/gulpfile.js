var gulp = require('gulp');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');


var dirs = {
    scripts: ['./bower_components/zepto/zepto.js','./scripts/app.js'],
    dest : './dist'
};

gulp.task('scripts', function() {
  gulp.src(dirs.scripts)
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(dirs.dest))
});

gulp.task('watch', function () {
    gulp.watch(dirs.scripts, ['scripts']);
})