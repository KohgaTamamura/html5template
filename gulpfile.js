var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var fs = require('fs');
var ejs = require( 'gulp-ejs' );


gulp.task('sass', function(){
  gulp.src('./material/sass/**/*.scss')
  .pipe(sass())
  .pipe(plumber())
  .pipe(gulp.dest('./app/assets/css/'));
});


gulp.task('serverStart', function(){
  gulp.src('./app/')
  .pipe(webserver({
    livereload: true,
    direcotyListing: true,
    open: true,
    host: '0.0.0.0'
  }));
});

gulp.task('ejs', function(){
  gulp.src(['./material/ejs/*.ejs', '!' + './material/ejs/common/*.ejs'])
  .pipe(plumber())
  .pipe(ejs('',{"ext": ".html"}))
  .pipe(gulp.dest('./app/'));
})


gulp.task('watchTask', function(){
  gulp.watch('./material/sass/**/*.scss', ['sass']);
  gulp.watch(['*.ejs','./material/ejs/*.ejs'], ['ejs']);  
});


gulp.task('default',['sass','ejs','serverStart','watchTask']);