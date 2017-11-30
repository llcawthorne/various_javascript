var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
    console.log("Building...");
    gulp.src('server.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});
