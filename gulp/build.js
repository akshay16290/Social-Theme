var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify');

gulp.task('deleteDistFolder', function(){
  return del("./dist/*/**");
});

gulp.task('optimizeImages', ['deleteDistFolder'], function(){
  return gulp.src(['./src/img/**/*'])
  .pipe(imagemin({
    progressive: true,
    interlaced: true,
    multipass: true
  }))
  .pipe(gulp.dest("./dist/src/img"));
});

gulp.task('usemin', ['deleteDistFolder'], function(){
  return gulp.src("./src/index.html")
  .pipe(usemin({
    css: [function(){return rev()}, function(){return cssnano()}],
    js: [function(){return rev()}, function(){return uglify()}]
  }))
  .pipe(gulp.dest("./dist"));
});


gulp.task('build', ['deleteDistFolder','optimizeImages', 'usemin']);
