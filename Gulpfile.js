/**
 *  Required libraries
 */
var path = require('path');
var gulp = require('gulp');
var through2 = require('through2');
var chalk = require('chalk');
var del = require('del');
var watch = require('gulp-watch');
var swaggerParser = require('swagger-parser');
var fs = require('fs');

/**
 * Gulp config values
 */
var mainSwaggerDefs = 'swagger/paths/*.yaml';
var outputFolder = 'swagger/bundles/';

/**
 * Cleans the `dist` folder.
 */
gulp.task('clean', function () {
    del(outputFolder + '/*');
});

/**
 * runs the Swagger-Parser validater once; this also builds the outputFolder files.
 */
gulp.task('validate', function () {
    gulp.src([mainSwaggerDefs])
        .pipe(vinylPipe(validateSwagger));
});

/**
 * watches files in the `swagger/paths` folder for changes and validates the contracts against swagger.
 */
gulp.task('watch', ['validate'], function () {
    watch(mainSwaggerDefs, {ignoreInitial: true}, function (file) {
        validateSwagger(file);
    });
});

function vinylPipe(func) {
    return through2.obj(function (file, enc, cb) {
        cb(null, func(file));
    });
}

function getOutputFileName(api) {
    var layer = "";
    if (api.info['x-architectural-layer']) {
        layer = api.info['x-architectural-layer'] + "-";
    }

    var outputFile = outputFolder + layer + api.info.title + '-' + api.info.version + '.json';
    return outputFile;
}

/**
 * calls SwaggerParser.validate--if input is valid,
 * creates the bundled json file in the bundles
 * director and reports results
 */
function validateSwagger(vinylFile) {
    var options = {validate: {spec: true}};
    return swaggerParser
        .validate(vinylFile.path, options)
        .then(function (api) {

            fs.writeFile(getOutputFileName(api), JSON.stringify(api));
            console.log(chalk.green('[ok]') + ' ' + vinylFile.path);
        })
        .catch(function (err) {
            var msg = chalk.red('[error]') + ' ' + vinylFile.path + '\n';
            msg = msg + err.message;
            console.log(msg);
        });
}
