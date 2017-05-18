import del from 'del';
import paths from './paths';

export default function clean(gulp) {
  gulp.task('clean:dist', () => del([`${paths.dist}/`], { dot: true }));
}
