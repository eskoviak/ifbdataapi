/**
 *  Required libraries
 */
var path = require('path');
var gulp = require('gulp');
var through2 = require('through2');
var chalk = require('chalk');
var del = require('del');
var exec = require('child_process').exec;
var yaml = require('gulp-yaml');
var replace = require('gulp-replace');
var watch = require('gulp-watch');
var SwaggerParser = require('swagger-parser');

/**
 * Gulp config values
 */
var input = 'swagger/**/*.yaml';
var mainSwaggerDefs = 'swagger/paths/*.yaml';
var stubSwaggerDefs = 'swagger/stubs/*.yaml';
var output = 'dist';
var swaggerCDN = 'https://cdn-dev.infarmbureau.com/swagger/';


/**
 * Cleans the `dist` folder.
 */
gulp.task('clean', function () {
  del(output + '/*');
});

/**
 * replaces local file $refs with url $refs, converts to JSON, outputs to
 * `dist/`
 */
gulp.task('build', ['clean'], function () {
  var findRef = /[$]ref: [.]{0,2}[/](.*)[.]yaml#?(.*)/g;
  var replaceRef = "$ref: " + swaggerCDN + "$1.json#$2";

  return gulp.src(input)
  .pipe(replace(findRef, replaceRef))
  .pipe(yaml({ space: 4}))
  .pipe(gulp.dest(output));
});

/**
 * runs the Swagger-Parser validator once.
 */
gulp.task('validate', function () {
  gulp.src([mainSwaggerDefs, stubSwaggerDefs])
    .pipe(vinylPipe(validateSwagger));
});

/**
 * watches files in the `swagger` folder for changes and validates the `swagger/swagger.yaml`.
 */
gulp.task('watch', ['validate'], function () {
  watch(input, { ignoreInitial: true }, function (file) {

    if (!/paths/.test(file.path)) {
      gulp.src(stubSwaggerDefs)
        .pipe(vinylPipe(validateSwagger));
    }
    else {
      validateSwagger(file);
    }
  });
});

function vinylPipe(func) {
  return through2.obj(function (file, enc, cb) {
    cb(null, func(file));
  });
}

/**
 * calls SwaggerParser.validate and reports results
 */
function validateSwagger(vinylFile) {
    var options = { validate: { spec: true } };


    return SwaggerParser
      .validate(vinylFile.path, options)
      .then(function () {
        var msg = chalk.green('[ok]') + ' ' + vinylFile.path;
        console.log(msg);
      })
      .catch(function (err) {
        var msg = chalk.red('[error]') + ' ' + vinylFile.path + '\n';
        msg = msg + err.message;
        console.log(msg);
      });
}
