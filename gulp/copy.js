import paths from './paths';

export default function copy(gulp) {
  gulp.task('copy:package', () =>
    gulp.src(['package.json'], { cwdbase: true }).pipe(gulp.dest(paths.dist)),
  );
}
