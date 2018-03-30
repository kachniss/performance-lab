var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cssnano = require("gulp-cssnano");

var plumberErrorHandler = {
   errorHandler: notify.onError({
      title: 'Gulp',
      message: 'Error: <%= error.message %>'
   })
};

gulp.task('sass', function() {
   gulp.src('./sass/style.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(cssnano())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest('./build/css'))
});

gulp.task('scripts', function(){
    gulp.src(['./js/*.js', './js/vendor/*.js'])
        //.pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./build/js'))
});

gulp.task('browser-sync', function() {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });

   gulp.watch(['build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('watch', function() {
   gulp.watch('sass/*.scss', ['sass']);
   gulp.watch('js/*.js', ['scripts']);
   gulp.watch('*.html', ['reload']);
});

gulp.task('reload', ['scripts', 'sass'], function() {
    browserSync.reload();
 });

gulp.task('default', ['watch', 'browser-sync', 'scripts', 'sass']);
