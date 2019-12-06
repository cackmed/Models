const Dog = require('./Dog');

describe('Dog Model', () => {
  describe('name', () => {
    it('requires a name', () => {
      const dog = new Dog ({
        age: 2,
        weight: '20 ib'
      });
      const { errors } = dog.validateSync();
      expect(errors.name.message).toEqual('Path `name` is required.');
    });
  });
  describe('age', () => {
    it('requires a age', () => {
      const dog = new Dog ({
        name: 'spot',
        weight: '20 ib'
      });
      const { errors } = dog.validateSync();
      expect(errors.age.message).toEqual('Path `age` is required.');
    });
  });
  describe('weight', () => {
    it('requires a weight', () => {
      const dog = new Dog ({
        name: 'spot',
        age: 2
      });
      const { errors } = dog.validateSync();
      expect(errors.weight.message).toEqual('Path `weight` is required.');
    });
  });
});
