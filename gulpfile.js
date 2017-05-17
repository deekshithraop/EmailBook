var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream')

var path = {
  app_src: './src/app.js',
	src: './src/**/*.js',
	dest: './dist'
};

gulp.task('build', function() {
	browserify(path.app_src)
		.transform('reactify')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(path.dest));
});

gulp.task('watch', function() {
  gulp.watch(path.src, ['build']);
});

gulp.task('serve', function() {
  return connect.server({
    root: [__dirname],
    port: 8888
  })
});