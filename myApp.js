require('dotenv').config();

let mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({name: 'Jimwell Ibay', age: 19, favoriteFoods: ['mango', 'chiken', 'beef']});

  person.save(function (err, data) {
    if (err) return console.err(err);
    done(null , data);
  });

};

let arrayOfPeople = [
  {
    name: 'Jack Robert Rival',
    age: 34,
    favoriteFoods: ['beef', 'seafood', 'banana', 'eggplant'] 
  },
  {
    name: 'Princess Coronela',
    age: 18,
    favoriteFoods: ['carbonara', 'egg'] 
  },
  {
    name: 'King Jobert II',
    age: 50,
    favoriteFoods: ['beef', 'fruits', 'pork'] 
  },
  {
    name: 'Susan Manansala',
    age: 32,
    favoriteFoods: ['adobo'] 
  },
  {
    name: 'John Mark Silang',
    age: 24,
    favoriteFoods: ['fish', 'vegestable'] 
  },
];

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.err(err);
    done(null, people);
  });
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.err(err);
    done(null, personFound);
  }); 
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, foodFound) {
    if (err) return console.err(err);
    done(null, foodFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, idFound) {
    if (err) return console.err(err);
    done(null, idFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, person) {
    if (err) return console.err(err);
    
    person.favoriteFoods.push(foodToAdd);

    person.save(function (err, updatedPerson) {
      if (err) return console.err(err);
      done(null, updatedPerson);
    });

  });

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, function (err, updatedPerson) {
    if (err) return console.log(err);
    done(null, updatedPerson);
  });

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, removedPerson) {
    if (err) return console.log(err);
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function (err, removed) {
    if (err) return console.log(err);
    done(null, removed);
  });
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select('-age')
  .exec(function (err, searches) {
    if (err) return console.log(err);
    done(null, searches);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
