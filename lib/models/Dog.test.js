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
    it('is over 0', () => {
      const dog = new Dog ({
        name: 'spot',
        age: -3,
        weight: '20 ib'
      });
      const { errors } = dog.validateSync();
      expect(errors.age.message).toEqual('Path `age` (-3) is less than minimum allowed value (0).');
    });
    it('is under 20', () => {
      const dog = new Dog ({
        name: 'spot',
        age: 23,
        weight: '20 ib'
      });
      const { errors } = dog.validateSync();
      expect(errors.age.message).toEqual('Path `age` (23) is more than maximum allowed value (20).');
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
