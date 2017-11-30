require("shelljs/global");
var fs = require('fs');
var lwip = require('lwip');
var path = require('path');
var readlineSync = require('readline-sync');
var options = require('./options.js');

var imagesDirectory = options.imagesDirectory;
var size = options.size;

// wipe out existing thumbnails directory
thumbsDirectory = path.join(imagesDirectory, "thumbs");
if(!options.force && fs.existsSync(thumbsDirectory)) {
  var response = readlineSync.keyInYN(`${thumbsDirectory} exists, wipe it and continue?`);
  if (!response) {
    echo("Aborting...");
    exit();   // don't need process.exit(), because require('shelljs/global');
  }
}
rm('-rf', thumbsDirectory);       // equivalent to fs.rmDirSync(), but removes files too!
mkdir(thumbsDirectory);           // shelljs mkdir is roughly equivalent to fs.mkdirSync()
// shelljs mkdir allows mkdir('-p', 'images/thumbs/whatever/something/')

//var images = ls('images/*.jpg');  // ls() is the shelljs equivalent to fs.readDirSync()
var images = find(imagesDirectory).filter(file => file.match(/\.jpg$/i));
if(!options.quiet) {
  echo(images);                     // echo() is the shelljs equivalent to console.log()
}

images.forEach(imageFile => {
  "use strict";
  lwip.open(imageFile, (error, image) => {
    //echo(imageFile);
    //echo(`Width: ${image.width()}, Height: ${image.height()}`);
    var fileName = path.basename(imageFile);
    var thumbFile = path.join(thumbsDirectory, fileName);
    if(!options.quiet) {
      echo(`thumbFile: ${thumbFile}`);
    }

    // we're just performing two batch operations per file here.  contain to 200x200 black background, then writeFile
    image.batch()
      .contain(size, size, "black")
      .writeFile(thumbFile, err => {
        if(err) {
          console.error(err);
          return;
        }
        //echo(`${thumbFile} done!`);
        // we could test for presence of open with if(which('open')) { exec(`open ${thumbFile}`); }
        //exec(`open ${thumbFile}`);
      });
  });
});