var yaml=require('yaml-js');
var fs=require('fs');
var through=require('through2');

var inStream = fs.createReadStream('./swagger/models/Policy.yaml', { flags: 'r'});
var outStream = fs.createWriteStream('./swagger/models/Policy.json', { flags: 'w'});

inStream.read();
inStream.pipe(through.obj( function (chunk, enc, callback) {
    this.push(JSON.stringify(yaml.load(chunk)))
  })).pipe(outStream);
