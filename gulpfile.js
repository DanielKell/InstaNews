var gulp = require('gulp'); // Load Gulp!
// Now that we've installed the uglify package we can require it:
var uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('scripts', function(){
  gulp.src('./js/*.js') // What files do we want gulp to consume?
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: '.min.js' })) // Rename the uglified file - renaming the extention name
    .pipe(gulp.dest('./build/js/')) // Where do we put the result. The destianation of where the file should go
});

// Modify our default task method by passing an array of task names

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    eslint      = require('gulp-eslint').
    sass        = require('gulp-sass'),
    prettyError = require('gulp-prettyerror'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano     = require('gulp-cssnano'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function() {
   gulp.src('./sass/style.scss')
      .pipe(prettyError())
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'))
});

gulp.task('watch', function() {
    gulp.watch('./js/*.js', ['scripts']);
    gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('lint', function() { 
    return gulp.src(['./js/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['./build/js/*.js', './build/css/*.css' ]).on('change', browserSync.reload);

});

gulp.task('default', ['watch', 'browser-sync']);
