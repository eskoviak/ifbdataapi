var yaml=require('yaml-js');
var fs=require('fs');
var through=require('through2');
var body = '';

var inStream = fs.createReadStream('./swagger/models/Policy.yaml', { flags: 'r'});
var outStream = fs.createWriteStream('./swagger/models/Policy.json', { flags: 'w'});

inStream.read();
inStream.pipe(through.obj( function (chunk, enc, callback) {
    var jsobj = yaml.load(chunk)
    this.push(jsobj)
  }))
    .pipe(through.obj( function (chunk, enc, callback) {
   		this.push(JSON.stringify(chunk))
  }))
  .pipe(outStream);
