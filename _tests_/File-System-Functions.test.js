const fs = require('fs').promises;
const writeJson = require('../lib/write-json');
const readJson = require('../lib/read-json');
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(() => Promise.resolve('My File Contents')),
    writeFile: jest.fn(() => Promise.resolve())
  }
}));
describe('jsonWrite function', () => {
  it('can write a object into a file at dest', () => {
    return writeJson('../Colors.md', {
      favoriteColor: 'blue',
      randomColor: 'magenta'
    })
      .then(() => {
        expect(fs.writeFile).toHaveBeenLastCalledWith('./Colors.md', JSON.stringify({
          favoriteColor: 'blue',
          randomColor: 'magenta'
        }));
      });
  });
});
describe('jsonRead function', () => {
  it('can read an object from a file', () => {
    return readJson('./Colors.md')
      .then(() => {
        expect(fs.readFile).toHaveBeenLastCalledWith('./Colors.md');
      });
  });
});

