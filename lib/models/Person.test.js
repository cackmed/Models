const Person = require('./Person');
describe('Person Model', () => {
  describe('name', () => {
    it('requires a name', () => {
      const person = new Person ({
        age: 23,
        job: 'uber driver'
      });
      const { errors } = person.validateSync();
      expect(errors.name.message).toEqual('Path `name` is required.');
    });
  });
  describe('age', () => {
    it('requires a age', () => {
      const person = new Person ({
        name: 'Rick',
        job: 'Uber driver'
      });
      const { errors } = person.validateSync();
      expect(errors.age.message).toEqual('Path `age` is required.');
    });
    it('is over 0', () => {
      const person = new Person ({
        name: 'spot',
        age: -3,
        job: 'Uber driver'
      });
      const { errors } = person.validateSync();
      expect(errors.age.message).toEqual('Path `age` (-3) is less than minimum allowed value (0).');
    });
    it('is under 120', () => {
      const person = new Person ({
        name: 'Rick',
        age: 143,
        job: 'Uber driver'
      });
      const { errors } = person.validateSync();
      expect(errors.age.message).toEqual('Path `age` (143) is more than maximum allowed value (120).');
    });
  });
    
  describe('job', () => {
    it('requires a job', () => {
      const person = new Person ({
        name: 'Rick',
        age: 23
      });
      const { errors } = person.validateSync();
      expect(errors.job.message).toEqual('Path `job` is required.');
    });
  });
});
