/*
  This file builds an individual model .svg file from the description in the
  data model repository

  author: eskoviak@eskoviak.net
  version: 0.1.0

  */

  var modelName = 'Policy.yaml';
  var basePath = '/eskoviak/ifbdataapi/develop/swagger/models/';

  const getOptions = {
    hostname: 'raw.githubusercontent.com',
    path: '', // will be built on the fly
    method: 'GET',
    auth: 'eskoviak:route66'
};

// This is the entry point for testing
getOptions.path = basePath + modelName;
getResource(modelName);

/*
  This function calls the repository and gets the raw file specified.
  It then processes it and extracts information about the properties, sending that
  data to the repsonseCB function
*/
function getResource(modelName) {
  require('https').get(getOptions, (response) => {
    var body = '';  // yaml file
    response.on('data', (d) => {
      body += d;
    });
    response.on('end', () => {
      process.stdout.write('==='+body+'===');
      if (body != '') (body) => {
      	process.stdout.write(require('js-yaml').safeLoad(body));
      };
    });
  });
}