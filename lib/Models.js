const uuid = require('uuid/v4');
const {
  mkdirp,
  writeJSON,
  readDirectoryJSON
} = require('./fs-functions');
module.exports = class Model {
  constructor(modelName, schema) {
    this.modelName = modelName;
    this.schema = schema;
  }

  init() {
    return mkdirp(`./${this.modelName}`);
  }

  create(obj) {
    const id = uuid();
    const validatedObj = this.schema.validate(obj);
    return writeJSON(`${this.modelName}/${id}`, { ...validatedObj, id });
  }

  find() {
    return readDirectoryJSON(`./${this.modelName}`);
  }
};
