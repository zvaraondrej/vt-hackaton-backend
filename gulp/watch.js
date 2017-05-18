export default function lint(gulp) {
  gulp.task('watch', () => {
    gulp.watch(['server/**/*.js', 'gulp/**/*.js'], ['lint:scripts']);
  });
}
