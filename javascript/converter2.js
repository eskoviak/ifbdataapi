/*
  This script converts a yaml file to a json-schema file

  @author: eskoviak@gmail.com
  @version: 0.1.0

 */
var yaml=require('yaml-js');
var fs=require('fs');
var through=require('through2');

// temp for testing/concept
var fileBase = 'Policy';

var inStream = fs.createReadStream(`./swagger/models/${fileBase}.yaml`, { flags: 'r'});
var outStream = fs.createWriteStream(`./swagger/models/${fileBase}.json`, { flags: 'w'});

inStream.read();
inStream.pipe(through.obj( function (chunk, enc, callback) {
    var jsobj = yaml.load(chunk)
    this.push(jsobj)
  }))
    .pipe(through.obj( function (chunk, enc, callback) {
   		this.push(JSON.stringify(chunk))
  }))
  .pipe(outStream);

function listProperties() {
  for (var i = 0; i < uniqueProperties.length; i++) {
    process.stdout.write(uniqueProperties[i] + '\n');
    for (var j = 0; j < properties.length; j ++) {
      if (uniqueProperties[i] == Object.getOwnPropertyNames(properties[j])[0]) {
        for (var objProp in properties[j]) {
          process.stdout.write('\tModel: '+properties[j][objProp]['model']+'\n');
          process.stdout.write(typeof properties[j][objProp]['type'] !== 'undefined' ? 
            '\t\tType: '+properties[j][objProp]['type']+'\n' : '');
          process.stdout.write(typeof properties[j][objProp]['$ref'] !== 'undefined' ? 
            '\t\t$ref: '+properties[j][objProp]['$ref']+'\n' : '');
          process.stdout.write('\t\tDesc: '+properties[j][objProp]['description']+'\n')
        }
      }
    }
    process.stdout.write('\n');
  }
}