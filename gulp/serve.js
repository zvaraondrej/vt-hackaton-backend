import runSequence from 'run-sequence';

export default function serve(gulp) {
  gulp.task('serve', (cb) => {
    runSequence('lint:scripts', 'start:server', 'watch', cb);
  });

  gulp.task('serve:prod', (cb) => {
    runSequence('build', 'start:server:prod', cb);
  });
}
