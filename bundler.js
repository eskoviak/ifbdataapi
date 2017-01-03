const YAML = require('yaml-js');
const SwaggerParser = require('swagger-parser');
const fs = require('fs')


const swaggerBundleDir = './swagger/bundles/';
const swaggerDir = './swagger/paths/';
const files = ['policies.yaml',
             'client-accounts.yaml',
			 'memberships.yaml',
			 'clients.yaml'
			 ]
//var files = fs.readdirSync('./swagger/paths/');
//console.log(files);
//return;
for ( file of files ) {
    SwaggerParser.bundle(swaggerDir+file,
      { strictValidation: true, validateSchema: true },
        (err, api) => {
		  if (err) throw err;
          fs.writeFile(swaggerBundleDir+api.info.title+'.yaml', YAML.dump(api),
		    (err) => {
			    if (err) throw err;
				console.log('Bundled:' + api.info.title);
            });
	    });
    };
  