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
var fs = require('fs');

/**
 * Gulp config values
 */
//var input = 'swagger/**/*.yaml';
var mainSwaggerDefs = 'swagger/paths/*.yaml';
//var stubSwaggerDefs = 'swagger/stubs/*.yaml';
var output = 'swagger/bundles/';
//var swaggerCDN = 'https://cdn-dev.infarmbureau.com/swagger/';


/**
 * Cleans the `dist` folder.
 */
gulp.task('clean', function () {
  del(output + '/*');
});

/**
 * runs the Swagger-Parser validater once; this also builds the output files.
 */
gulp.task('validate', function () {
  gulp.src([mainSwaggerDefs])
    .pipe(vinylPipe(validateSwagger));
});

/**
 * watches files in the `swagger/paths` folder for changes and validates the contracts against swagger.
 */
gulp.task('watch', ['validate'], function () {
  watch(mainSwaggerDefs, { ignoreInitial: true }, function (file) {
    validateSwagger(file);
  });
});

function vinylPipe(func) {
  return through2.obj(function (file, enc, cb) {
    cb(null, func(file));
  });
}

/**
 * calls SwaggerParser.validate--if input is valid, 
 * creates the bundled json file in the bundles 
 * director and reports results
 */
function validateSwagger(vinylFile) {
    var options = { validate: { spec: true } };
    return SwaggerParser
      .validate(vinylFile.path, options)
      .then(function (api) {
        fs.writeFile(output+api.info.title+'-'+api.info.version+'.json',  JSON.stringify(api))
        var msg = chalk.green('[ok]') + ' ' + vinylFile.path;
        console.log(msg);
      })
      .catch(function (err) {
        var msg = chalk.red('[error]') + ' ' + vinylFile.path + '\n';
        msg = msg + err.message;
        console.log(msg);
      });
}
