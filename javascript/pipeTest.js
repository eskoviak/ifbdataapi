require('fs').createReadStream('dataDict.json', { flags: 'r', encoding:'utf8'})
  .pipe(JSON.parse)
  .pipe( process.stdout)