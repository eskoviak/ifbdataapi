var yaml=require('yaml-js');
var fs=require('fs');
var through=require('through2');
var body = '';

var inStream = fs.createReadStream('./swagger/models/Policy.yaml', { flags: 'r'});

inStream.read();
inStream.pipe(through.obj( function (chunk, enc, callback) {
    var jsobj = yaml.load(chunk)
    process.stdout.write(jsobj)
    this.push(chunk)
  }))
   // .pipe(through.obj( (chunk, enc, callback) => {
   // 		this.push(JSON.stringify(chunk))
   // }))
  .pipe(process.stdout);

/*inStream.on('data', (d) => {
	body += d;
//	process.stdout.write(body);
})*/

/*inStream.on('end', () => {
//	process.stdout.write(body);
	if (body != '') () => {
		process.stdout.write(yaml.load(body) + '\n===\n');
	};
})
*/