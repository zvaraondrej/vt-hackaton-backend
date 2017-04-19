/*
 * Clean task
 */

import paths from './paths';
import del from 'del';

export default function clean(gulp){

  gulp.task('clean:tmp', () => del([`./${paths.tmp}/**/*`], {dot: true}));

  gulp.task('clean:dist', () => del([`${paths.dist}/`], {dot: true}));

}