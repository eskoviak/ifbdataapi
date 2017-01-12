/*
 * Model Valdidator
 */
var Parser = require('swagger-parser');
var fs = require('fs');
//const swaggerBundleDir = './swagger/bundles/';
const modelDir = './swagger/models/';

// build the list of .yaml files and pass to validation
fs.readdir(modelDir,
(err, files) => {
	files
		.filter( file => { return file.substr(-5) === '.yaml';})
		.forEach( file => { Parser.validate(modelDir+file, 
			                { validate : {schema : false, spec : false }},
							(err, api) => {
								if (err) {
									console.log(err.name + ' in '+err.message);
								} else {
//									console.log('MODEL %s is valid', api.info.title);
//									fs.writeFile(swaggerBundleDir+api.info.title+'.yaml',
//										require('yaml-js').dump(api),
//										console.log('API %s had been bundled', api.info.title));
								}
							})
		});
});  