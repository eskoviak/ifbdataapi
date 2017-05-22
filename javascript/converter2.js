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
