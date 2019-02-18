var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var serve = require('gulp-serve');
var sass = require('gulp-sass');

gulp.task( 'default', [ 'serve' ] );

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/scss/partials/*.scss', ['sass']);
  // Other watchers
})

gulp.task('browserSync', function() {
  browserSync.init({
      injectChanges: true,
      server: "./app"
  });
})

gulp.task('sass', function() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'app/scss/**/*.scss', "node_modules/bootstrap-tagsinput/src/bootstrap-tagsinput.css"]) // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.slim.js', 'node_modules/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'])
        .pipe(gulp.dest("app/js"))
        .pipe(browserSync.reload({
            stream: true
    }));
});

gulp.task('serve', ['sass', 'js'], function() {

    browserSync.init({
        server: "./app",
        port: 4200
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/scss/partials/*.scss", ['sass']);
    gulp.watch("app/js/*.js", ['js']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('serve-build', serve(['app', 'build']));
gulp.task('serve-prod', serve({
  root: ['app', 'build'],
  port: 4200,
  middleware: function(req, res) {
    // custom optional middleware
  }
}));
