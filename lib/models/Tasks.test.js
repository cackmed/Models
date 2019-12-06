const Task = require('./Task');
describe('Task Model', () => {
  describe('taskName', () => {
    it('requires a taskName', () => {
      const task = new Task ({
        scheduledTask: true,
        lengthoftimescheduled: 160
      });
      const { errors } = task.validateSync();
      expect(errors.taskName.message).toEqual('Path `taskName` is required.');
    });
  });
  describe('scheduledTask', () => {
    it('requires a scheduledTask', () => {
      const task = new Task ({
        taskName: 'Take out Trash',
        lengthoftimescheduled: 160
      });
      const { errors } = task.validateSync();
      expect(errors.scheduledTask.message).toEqual('Path `scheduledTask` is required.');
    });
  });
    
  describe('lengthoftimescheduled', () => {
    it('requires a lengthoftimescheduled', () => {
      const task = new Task ({
        taskName: 'Take out Trash',
        scheduledTask: true
      });
      const { errors } = task.validateSync();
      expect(errors.lengthoftimescheduled.message).toEqual('Path `lengthoftimescheduled` is required.');
    });
    it('is over 0', () => {
      const task = new Task ({
        taskName: 'Take out Trash',
        scheduledTask: true,
        lengthoftimescheduled: -23
      });
      const { errors } = task.validateSync();
      expect(errors.lengthoftimescheduled.message).toEqual('Path `lengthoftimescheduled` (-23) is less than minimum allowed value (0).');
    });
    it('is under 240', () => {
      const task = new Task ({
        taskName: 'Take out Trash',
        scheduledTask: true,
        lengthoftimescheduled: 275
      });
      const { errors } = task.validateSync();
      expect(errors.lengthoftimescheduled.message).toEqual('Path `lengthoftimescheduled` (275) is more than maximum allowed value (240).');
    });
  });
});
