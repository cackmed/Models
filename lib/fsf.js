const fs = require('fs').promises;


const writeJSON = (dest, object) => {
  return fs.writeFile(dest, JSON.stringify(object));    
};

writeJSON('./newFile.md', {
  Name: 'Howdy',
  isTrue: false,
  whatEves: 'maybe'
});
