import through from 'through2';
import prettierEslint from 'prettier-eslint';

export default function prettify(gulp){

  function formattingFnc() {
  return through.obj(parseFile);

  function parseFile(file, encoding, callback) {
    
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(new utils.PluginError(
        "prettier-eslint",
        "doesn't support Streams"
      ));
    }

    const sourceCode = file.contents.toString();

    const formatted = prettierEslint({
      eslintConfig: {
        parserOptions: {
          ecmaVersion: 6
        },
        rules: {
          semi: ["error", "never"]
        }
      },
      prettierOptions: {
        bracketSpacing: true
      },
      text: sourceCode
    });

    file.contents = new Buffer(formatted, encoding);

    return callback(null, file);
  }
};

  gulp.task("prettify", () => {
    return gulp
      .src("gulp/*.js")
      .pipe(formattingFnc())
      .pipe(gulp.dest("gulp/"));
  });
}