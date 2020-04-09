const fs = require('fs').promises;

const mkdirp = path => fs.mkdir(path, { recursive: true });

const writeJSON = (path, obj) => {
  return fs.writeFile(path, JSON.stringify(obj));
};

const readJSON = path => {
  return fs.readFile(path, 'utf8')
    .then(content => JSON.parse(content));
};

const readDirectoryJSON = path => {
  return fs.readdir(path)
    .then(files => {
      const promiseToReadAllJSON = files.map(file => {
        return readJSON(`${path}/${file}`);
      });
      return Promise.all(promiseToReadAllJSON);
    });
};

const updateJSON = async(path, action) => {
  const oldObj = await readJSON(path);
  const newObj = { ...oldObj, ...action };

  await writeJSON(path, newObj);

  return newObj;
};

const deleteFile = async(path) => {
  const json = await readJSON(path);
  await fs.unlink(path);

  return json;
};

module.exports = {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
};
