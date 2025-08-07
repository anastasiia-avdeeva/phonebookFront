import { Person } from "./Person";

export const Persons = ({ persons, onDelete }) => {
  return (
    <ul className="persons">
      {persons.map((person) => (
        <Person
          key={person.id}
          person={person}
          onDelete={() => onDelete(person.id)}
        />
      ))}
    </ul>
  );
};
