const fs = require('fs').promises;

module.exports = (src) => {
  fs.readFile(src, 'utf8').then(contents => JSON.parse(contents)); 
};



