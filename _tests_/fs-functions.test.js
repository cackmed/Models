const fs = require('fs').promises;
const {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
} = require('../lib/fs-functions');

// getters -> functions that return values
// setters -> function that write value
jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve()),
    writeFile: jest.fn(() => Promise.resolve()),
    readFile: jest.fn(() => Promise.resolve('{"name":"spot"}')),
    readdir: jest.fn(() => Promise.resolve(['file1', 'file2'])),
    unlink: jest.fn(() => Promise.resolve())
  }
}));

describe('file system functions', () => {
  it('mkdirp', () => {
    return mkdirp('./my/cool/path')
      .then(() => {
        expect(fs.mkdir).toHaveBeenCalledWith('./my/cool/path', { recursive: true });
      });
  });

  it('writeJSON', () => {
    return writeJSON('./path/to/file', {
      name: 'spot',
      age: 5,
      weight: '20 lbs'
    })
      .then(() => {
        expect(fs.writeFile).toHaveBeenCalledWith('./path/to/file', JSON.stringify({
          name: 'spot',
          age: 5,
          weight: '20 lbs'
        }));
      });
  });

  it('readJSON', () => {
    return readJSON('./path/to/file')
      .then(json => {
        expect(fs.readFile).toHaveBeenLastCalledWith('./path/to/file', 'utf8');
        expect(json).toEqual({
          name: 'spot'
        });
      });
  });

  it('readDirectoryJSON', () => {
    return readDirectoryJSON('./path/to/folder')
      .then(results => {
        expect(fs.readdir).toHaveBeenLastCalledWith('./path/to/folder');
        expect(results).toHaveLength(2);
        expect(results).toEqual([
          { name: 'spot' },
          { name: 'spot' }
        ]);
      });
  });

  it('updateJSON', () => {
    return updateJSON('./path/to/file', { age: 5 })
      .then(updatedJSON => {
        expect(fs.writeFile).toHaveBeenCalledWith('./path/to/file', JSON.stringify({
          name: 'spot',
          age: 5
        }));
        expect(updatedJSON).toEqual({
          name: 'spot',
          age: 5
        });
      });
  });

  it('deleteFile', () => {
    return deleteFile('./path/to/file')
      .then(deletedFile => {
        expect(fs.unlink).toHaveBeenCalledWith('./path/to/file');
        expect(deletedFile).toEqual({
          name: 'spot'
        });
      });
  });
});
