const fs = require('fs').promises;

const mkdirp = (path) => {
  return fs.mkdir(path, { recursive: true });
};

const writeJson = (dest, object) => {
  return fs.writeFile(dest, JSON.stringify(object));    
};
  
const readJson = (src) => 
  fs.readFile(src, 'utf8').then(contents => JSON.parse(contents)); 


module.exports = {
  readJson,
  writeJson,
  mkdirp
};
