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
var swaggerDefinitionSourceFolder = 'swagger/paths/*.yaml';
var bundleOutputFolder = 'swagger/bundles/';

/**
 * Cleans the `dist` folder.
 */
gulp.task('clean', function () {
    return del(bundleOutputFolder + '/*');
});

/**
 * runs the Swagger-Parser validater once;
 */
gulp.task('validate', function () {
    return gulp.src([swaggerDefinitionSourceFolder])
        .pipe(vinylPipe(swaggerProcessor));
});

/**
 * validates and builds the bundles in bundleOutputFolder .
 */
gulp.task('build', function () {
    return gulp.src([swaggerDefinitionSourceFolder])
        .pipe(vinylPipe(swaggerProcessor, saveBundle));
});

/**
 * watches files in the `swagger/paths` folder for changes and validates the contracts against swagger.
 */
gulp.task('watch', ['validate'], function () {
    return watch(swaggerDefinitionSourceFolder, {ignoreInitial: true}, function (file) {
        swaggerProcessor(file);
    });
});

function vinylPipe(fileProcessor, fileProcessorParams) {
    return through2.obj(function (file, enc, cb) {
        cb(null, fileProcessor(file, fileProcessorParams));
    });
}

function getOutputFileName(api) {
    var layer = "";
    if (api.info['x-architectural-layer']) {
        layer = api.info['x-architectural-layer'] + "-";
    }

    var outputFile = bundleOutputFolder + layer + api.info.title + '-' + api.info.version + '.json';
    return outputFile;
}

function saveBundle(api){

    var outputFileName = getOutputFileName(api);
    console.log(chalk.blue('[Creating : ] ') + outputFileName);
    fs.writeFile(outputFileName, JSON.stringify(api));
}
/**
 * calls SwaggerParser.validate--if input is valid,
 * creates the bundled json file in the bundles
 * director and reports results
 */
function swaggerProcessor(vinylFile, successCallBack) {
    var options = {validate: {spec: true}};
    return swaggerParser
        .validate(vinylFile.path, options)
        .then(function (api) {

            if (successCallBack) {
                successCallBack(api);
            }
            console.log(chalk.green('[ok]') + ' ' + vinylFile.path);
        })
        .catch(function (err) {
            var msg = chalk.red('[error]') + ' ' + vinylFile.path + '\n';
            msg = msg + err.message;
            console.log(msg);
        });
}
