var fs = require('fs');
//var expandTilde = require('expand-tilde');
//var path = require('path');
var prettyData = require('pretty-data').pd;

// files at: ~/code/javascript/shell-scripting-with-javascript/2-prettyXML/MyFoodapediaData
// var xmlFile = expandTilde("~/code/javascript/shell-scripting-with-javascript/2-prettyXML/MyFoodapediaData");
//var xmlFile = path.join(process.env.PWD, "MyFoodapediaData/Food_Display_Table.xml");
var xmlFile = process.argv[2];

if(!fs.existsSync(xmlFile)) {
  console.warn("ERROR file doesn't exist: " + xmlFile);
  process.exit(1);  // if you require("shelljs/global"); you get an exit(1); in scope
}

var fileContents = fs.readFileSync(xmlFile, 'utf8');  // we could require("shelljs/global") and then cat(xmlFile);
var prettyXml = prettyData.xml(fileContents);
console.log(prettyXml);
