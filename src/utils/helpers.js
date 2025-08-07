const findPersonById = (persons, id) => {
  return persons.find((person) => person.id === id);
};

const findPersonByName = (persons, name) => {
  return persons.find((person) => person.name === name);
};

const isNameInPersons = (persons, name) => {
  return persons.some((person) => person.name === name);
};

const isNumberInPersons = (persons, number) => {
  return persons.some((person) => person.number === number);
};

// const isValueInPersons = (propertyName, persons, value) => {
//   return persons.some((person) => person[propertyName] === value);
// };

export default {
  findPersonById,
  findPersonByName,
  //   isValueInPersons,
  isNameInPersons,
  isNumberInPersons,
};
