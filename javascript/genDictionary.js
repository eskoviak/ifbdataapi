/*
Reads a list of yaml files to read from a repository, and build
a data dictionary (json file) of the property elements

author:  eskoviak@gmail.com
version: 0.9.1  -- feature/issue-4

 */

'use strict';
var fs = require('fs');
var readline = require('readline');
var https = require('https');
var yaml = require('js-yaml');
var basePath = '/eskoviak/ifbdataapi/develop/swagger/models/';
var items = [];

// OPTIONS Declarations
const getOptions = {
    hostname: 'raw.githubusercontent.com',
    path: '', // will be built on the fly
    method: 'GET',
    auth: 'eskoviak:route66'
};

const outOptions = {
    flags: 'w'
};

const inOptions = {
    flags: 'r'
};

// create i/o streams
var outStream = fs.createWriteStream('dataDict.json', outOptions);
var inStream = fs.createReadStream('filelist.txt', inOptions);  // list of models

// use the readline interface to facilitate reading a line of text
const rl = readline.createInterface({
  input: inStream
});

rl.on('line', (line) => {
  getOptions.path = basePath + line;
  getResource(line, responseCB);
})

inStream.on('end', () => {
  setTimeout(streamEndCB, 5000);
})

/*
  This function calls the repository and gets the raw file specified.
  It then processes it and extracts information about the properties, sending that
  data to the repsonseCB function
*/
function getResource(modelName, responseCB) {
  https.get(getOptions, (response) => {
    var body = '';
    response.on('data', (d) => {
      body += d;
    });
    response.on('end', () => {
      if (body != '') responseCB(modelName, yaml.safeLoad(body));
    });
  });
}

/*
  This function parses the response (data :== js object), and populates the
  various fields in the value object, which is then added to the raw 
  json file via a write stream.
 */
function responseCB(modelName, data) {
  for (var objProperty in data.properties) {
    data.properties[objProperty]['model'] = modelName;
    if (typeof data.required !== 'undefined' && data.required !=null) {
      if ( data.required.indexOf(objProperty) >= 0 ) {
        data.properties[objProperty]['model'] = '*'+modelName;  // add decoration
      }
    }
    var temp = {};
    temp[objProperty] = data.properties[objProperty];
    items.push(temp);
  }
}


/*function sortObjArray(items) {
  var item = {}, key, temp = [], outItems = {};
  var i;
  for (i=0; i< items.length; i++) {
    item = items[i];
    for (key in item) {
          console.log(key);
          temp.push(key);      
    }
  }

  temp.sort();
  console.log(temp);
  return outItems;
}

function streamCB() {
  //oos.write(',');
}
*/
function streamEndCB() {
  outStream.write(JSON.stringify({ datadictionary: items}));
  outStream.end();
}
