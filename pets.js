'use strict';

var fs = require('fs');
var path = require('path');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var opt = +process.argv[3];
var kind = +process.argv[4];
var name = +process.argv[5];

if (cmd === "read") {
  var read = fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) throw err;
    var goodData = JSON.parse(data)
    if (opt > goodData.length - 1 || opt < 0) {
      console.log(`Usage: ${node} ${file} read INDEX`);
    } else if (goodData) {
      console.log(goodData[opt] || goodData)
    }
  })
} else if (cmd === "create") {
  if (process.argv.length < 6) {
    console.log('Usage: node pets.js create AGE KIND NAME')
  } else {
    fs.readFile('pets.json', 'utf8', function(err, data) {
      var age = process.argv[3]
      var kind = process.argv[4]
      var name = process.argv[5]

      var parsed = JSON.parse(data)
      parsed.push({
        age: age,
        kind: kind,
        name: name
      })
      fs.writeFile('pets.json', JSON.stringify(parsed), function(arr) {
        if (err) conosle.log(err)
      })
    })
  }
} else {
  console.log(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
