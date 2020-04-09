const Toy = require('./Toy');
describe('Toy Model', () => {
  describe('name', () => {
    it('requires a name', () => {
      const toy = new Toy ({
        condition: 'good',
        yearMade: 1973
      });
      const { errors } = toy.validateSync();
      expect(errors.name.message).toEqual('Path `name` is required.');
    });
  });
  describe('condition', () => {
    it('requires a condition', () => {
      const toy = new Toy ({
        name: 'GI Foe',
        yearMade: 1973
      });
      const { errors } = toy.validateSync();
      expect(errors.condition.message).toEqual('Path `condition` is required.');
    });
  });
    
  describe('yearMade', () => {
    it('requires a yearMade', () => {
      const toy = new Toy ({
        name: 'GI Foe',
        condition: 'good',
      });
      const { errors } = toy.validateSync();
      expect(errors.yearMade.message).toEqual('Path `yearMade` is required.');
    });
    it('is over 1968', () => {
      const toy = new Toy ({
        name: 'GI Foe',
        condition: 'good',
        yearMade: 1957
      });
      const { errors } = toy.validateSync();
      expect(errors.yearMade.message).toEqual('Path `yearMade` (1957) is less than minimum allowed value (1968).');
    });
    it('is under 2019', () => {
      const toy = new Toy ({
        name: 'GI Foe',
        condition: 'good',
        yearMade: 2034
      });
      const { errors } = toy.validateSync();
      expect(errors.yearMade.message).toEqual('Path `yearMade` (2034) is more than maximum allowed value (2019).');
    });
  });
});

