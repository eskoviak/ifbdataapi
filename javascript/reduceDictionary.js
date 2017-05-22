/*
  This function accepts a data dictionary which may have multiple entries and reduces the entries to
  a single entry, with an array of models and descriptions

  This module expects a dataDictionary object to be piped in via stdin.
  author: eskoviak@gmail.com
  version: 0.1.0 feature/issue-4

*/

var fs = require('fs');
var inFile = 'dataDict.json';
var dataDictionary = {};
var properties = [];
var uniqueProperties = [];
stringBuf = '';

//
// Get the input JSON file, process it into the dataDictionary object
//
inStream = fs.createReadStream(inFile, { flags: 'r'});
inStream.setEncoding('utf8');

inStream.on('data', (chunk) => {
  stringBuf += chunk;
})

inStream.on('end', () => {
	dataDictionary = JSON.parse(stringBuf);
	properties = dataDictionary.datadictionary;
	collateProperties();
  listProperties();
})
// 

function collateProperties() {
	for(var i = 0; i < properties.length; i++) {
	  var propName = Object.getOwnPropertyNames(properties[i])[0];
    if (uniqueProperties.indexOf(propName) >= 0) {
      ;
    } else {
      uniqueProperties.push(propName);
    }
	}
  uniqueProperties.sort();
  //console.log(uniqueProperties.sort());
}

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
