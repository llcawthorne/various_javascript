var program = require('commander');

program
  .version('1.0')
  .option('-s, --size <integer>', 'The image size to shrink to, both height and width.', 200)
  .option('-d, --directory <path>', 'The directory of images to create thumbnails for.')
  .option('-q, --quiet', "Run in silent mode")
  .option('-f, --force', 'Force removal even if thumbs directory already exists')
  .parse(process.argv);

if(!program.directory){
  echo("Images directory expected");
  program.help();
}

module.exports.imagesDirectory = program.directory;
module.exports.size = parseInt(program.size);
module.exports.quiet = program.quiet;
module.exports.force = program.force;