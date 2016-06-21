var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

gulp.task('lint', function() {
  return gulp.src(['index.js', 'test/*.js', 'gulpfile.js'])
    .pipe(eslint({
      quiet: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', function() {
  return gulp.src('test/*.js', {read: false})
    .pipe(mocha());
});

gulp.task('default', ['lint', 'test']);
