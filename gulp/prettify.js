import paths from './paths';
import through from 'through2';
import runSequence from 'run-sequence';
import prettierEslint from 'prettier-eslint';

export default function prettify(gulp) {
  function format() {
    return through.obj(parseFile);

    function parseFile(file, encoding, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }

      if (file.isStream()) {
        return callback(new utils.PluginError('prettier-eslint', "doesn't support Streams"));
      }

      const sourceCode = file.contents.toString();

      const formatted = prettierEslint({
        eslintConfig: {
          parserOptions: {
            ecmaVersion: 6,
          },
          rules: {
            semi: ['error', 'never'],
          },
        },
        prettierOptions: {
          bracketSpacing: true,
        },
        text: sourceCode,
      });

      file.contents = new Buffer(formatted, encoding);

      return callback(null, file);
    }
  }

  gulp.task('prettify', (cb) => {
    runSequence(['prettify:client', 'prettify:server', 'prettify:gulp'], cb);
  });
  gulp.task('prettify:gulp', () =>
    gulp.src(paths.gulp.scripts).pipe(format()).pipe(gulp.dest(paths.gulp.root)),
  );
  gulp.task('prettify:client', () =>
    gulp.src(paths.client.scripts).pipe(format()).pipe(gulp.dest(paths.client.root)),
  );
  gulp.task('prettify:server', () =>
    gulp.src(paths.server.scripts).pipe(format()).pipe(gulp.dest(paths.server.root)),
  );
}
