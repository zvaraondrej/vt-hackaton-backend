import paths from './paths';

export default function env(gulp, plugins) {
  gulp.task('env:dev', () => {
    plugins.env({
      vars: { NODE_ENV: 'development' },
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
