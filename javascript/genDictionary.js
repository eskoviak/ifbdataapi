/*
Reads a list of yaml files to read from a repository via http, and builds
a data dictionary (json file) of the property elements--note, this file is not
normalized--an entry is made for each property in each model, so multiples will exist.

@author:  eskoviak@gmail.com
@version: 0.9.2  -- EWS 848

 */

'use strict';
var fs = require('fs');
var readline = require('readline');
var http = require('http');
var yaml = require('yaml-js');
var basePath = '/projects/ES/repos/enterpriseapidatamodel/raw/swagger/models/';
var query = '?at=refs%2Fheads%2Fdevelop';
var items = [];

// OPTIONS Declarations
const getOptions = {
    hostname: 'bitbucket.infarmbureau.com',
    port: 7990,
    path: '', // will be built on the fly
    method: 'GET',
};

const outOptions = {
    flags: 'w'
};

const inOptions = {
    flags: 'r'
};

// create i/o streams
var outStream = fs.createWriteStream('./javascript/dataDict.json', outOptions);
var inStream = fs.createReadStream('./javascript/filelist.txt', inOptions);  // list of models

// use the readline interface to facilitate reading a line of text
const rl = readline.createInterface({
  input: inStream
});

rl.on('line', (line) => {
  getOptions.path = basePath + line + query;
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
  http.get(getOptions, (response) => {
    var body = '';
    response.on('data', (d) => {
      body += d;
    });
    response.on('end', () => {
      if (body != '') responseCB(modelName, yaml.load(body));
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
