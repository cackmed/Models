const fs = require('fs').promises;

const { 
  readJson,
  writeJson
} = require('../lib/data-base-functions');

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(() => Promise.resolve('My File Contents')),
    writeFile: jest.fn(() => Promise.resolve())
  }
}));

describe('jsonWrite function', () => {
  it('can write a object into a file at dest', () => {
    return writeJson('./color.json', {
      favoriteColor: 'blue',
      randomColor: 'magenta'
    })
      .then(() => {
        expect(fs.writeFile).toHaveBeenLastCalledWith('./color.json', JSON.stringify({
          favoriteColor: 'blue',
          randomColor: 'magenta'
        }));
      });
  });
});

// describe('jsonRead function', () => {
//   it('can read an object from a file', () => {
//     return readJson('./color.json')
//       .then((contents) => {
//         expect(contents).toEqual({
//           favoriteColor: 'blue',
//           randomColor: 'magenta'
//         });
//       });
//   });
// });

