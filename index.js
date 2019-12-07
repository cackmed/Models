require('dotenv').config();
require('./lib/utils/connect')();
const chance = require('chance').Chance();
const Dog = require('./lib/models/Dog');

Dog.create({
  name: chance.name(),
  age: chance.integer(),
  weight: chance.string()
});
console.log('dog created');


async function allCrudMethods() {
  const createdDog = await Dog.create({
    name: 'spot',
    age: 5,
    weight: '20 ib'

  }); 
  const singleDog = await Dog.findById(createdDog._id);
  const allDogs = await Dog.find();

  const updatedDogData = await Dog.findByIdAndUpdate(singleDog._id,
    { name: 'rover' },
    { age: 5 },
    { weight: '30 ibs' });

  const deletedDogs = await Dog.findByIdAndDelete(singleDog._id); 


}
