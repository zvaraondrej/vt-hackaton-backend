/*
 * Serving task
 */

import runSequence from 'run-sequence';

export default function serve(gulp){

  gulp.task('serve', cb => {
      runSequence(
        'clean:tmp',
        'webpack:dev',
        'start:server',
        cb
    );
  });

  gulp.task('serve:prod', cb => {
      runSequence(
        'build',
        'start:server:prod',
        cb
      );
  });

}
