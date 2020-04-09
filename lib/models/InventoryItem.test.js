const InventoryItem = require('./InventoryItem');
describe('InventoryItem Model', () => {
  describe('name', () => {
    it('requires a name', () => {
      const inventoryItem = new InventoryItem ({
        inventory: 340,
        desc: 'a top of the line bed pick up off the side of the freeway'
      });
      const { errors } = inventoryItem.validateSync();
      expect(errors.name.message).toEqual('Path `name` is required.');
    });
  });
  describe('inventory', () => {
    it('requires a inventory', () => {
      const inventoryItem = new InventoryItem ({
        name: 'Memory Wood Mattress',
        desc: 'a top of the line bed pick up off the side of the freeway'
      });
      const { errors } = inventoryItem.validateSync();
      expect(errors.inventory.message).toEqual('Path `inventory` is required.');
    });
    it('is over 0', () => {
      const inventoryItem = new InventoryItem ({
        name: 'Memory Wood Mattress',
        inventory: -2,
        desc: 'a top of the line bed pick up off the side of the freeway'
      });
      const { errors } = inventoryItem.validateSync();
      expect(errors.inventory.message).toEqual('Path `inventory` (-2) is less than minimum allowed value (0).');
    });
  });
    
  describe('desc', () => {
    it('requires a desc', () => {
      const inventoryItem = new InventoryItem ({
        name: 'Memory Wood Mattress',
        inventory: 340,
      });
      const { errors } = inventoryItem.validateSync();
      expect(errors.desc.message).toEqual('Path `desc` is required.');
    });
  });
});

