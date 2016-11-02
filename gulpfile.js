// Include gulp
var gulp = require('gulp');

// Include Our Plugins
/*var scss = require('gulp-sass');*/
var supervisor = require('gulp-supervisor');

// Compile Our Sass
/*gulp.task('scss', function() {
 return gulp.src('public/webapp/assets/scss/main.scss')
 .pipe(scss())
 .pipe(gulp.dest('public/webapp/assets/css'));
 });*/

gulp.task('supervisor', function () {
    supervisor("bin/www");
});

// Watch Files For Changes
/*gulp.task('watch', function() {
 gulp.watch('public/webapp/assets/scss/!**!/!*.scss', ['scss']);
 });*/

// Default Task
gulp.task('default', ['supervisor']);