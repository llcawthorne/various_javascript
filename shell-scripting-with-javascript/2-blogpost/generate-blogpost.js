var moment = require('moment');
var fs = require('fs');

var date = moment().format("YYYY-MM-DD-HH-mm");
var user = global.process.env.USER;   // require('shelljs/global') allows you to reference env directly: env.USER

var header = `
--Date: ${date}
--User: ${user}
--Title:
--------------------------------------`;

var filename = `${date}.md`;

if(fs.existsSync(filename)) {
  // use console.warn to send to stderr
  console.warn(`ERROR: File ${filename} already exists!`);
  process.exit(1);
} else {
  // console.log just sends to stdout
  console.log(`Creating ${filename}`);
  fs.writeFile(filename, header);   // with require('shelljs/global') we could do header.to(filename); to write file!
}