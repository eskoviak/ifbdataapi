/*
 * Bundler and Validater
 */
var Parser = require('swagger-parser');
var fs = require('fs');
const swaggerBundleDir = './swagger/bundles/';
const swaggerDir = './swagger/paths/';

// build the list of .yaml files and pass to validation and bundling
fs.readdir(swaggerDir,
(err, files) => {
	files
		.filter( file => { return file.substr(-5) === '.yaml';})
		.forEach( file => { Parser.validate(swaggerDir+file, 
							(err, api) => {
								if (err) {
									console.log(err.name + ' in '+err.message);
								} else {
									console.log('API %s is valid', api.info.title);
//									console.log('===');
//									console.log(JSON.stringify(api));
									fs.writeFile(swaggerBundleDir+api.info.title+"-"+api.info.version+".json",
										JSON.stringify(api),
										console.log('API %s had been bundled', api.info.title));
								}
							})
		});
});  