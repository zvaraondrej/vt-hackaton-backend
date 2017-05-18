import paths from './paths';

export default function env(gulp, plugins) {
  gulp.task('env:local', () => {
    plugins.env({
      vars: { NODE_ENV: 'local' },
    });
  });
  gulp.task('env:test', () => {
    plugins.env({
      vars: { NODE_ENV: 'test' },
    });
  });

  gulp.task('env:prod', () => {
    plugins.env({
      vars: { NODE_ENV: 'production' },
    });
  });
}
