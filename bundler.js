const YAML = require('yaml-js');
const SwaggerParser = require('swagger-parser');
const fs = require('fs');

const swaggerBundleDir = './swagger/bundles';
const swaggerDir = './swagger/paths';
const swaggerIndex = `${swaggerDir}/policies.yaml`;

SwaggerParser.bundle(swaggerIndex,
  { strictValidation: true, validateSchema: true },
  (err, api, metadata) => {
    console.error(err);
    console.log(YAML.dump(api));
    fs.writeFile(`${swaggerBundleDir}/policies.yaml`, YAML.dump(api), console.error);
  });