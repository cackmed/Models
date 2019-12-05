const fs = require('fs').promises;


module.exports = (dest, object) => {
  return fs.writeFile(dest, JSON.stringify(object));    
};


