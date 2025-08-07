import { Button } from "./button";

export const Person = ({ person, onDelete }) => (
  <li className="person">
    <span className="person-info">
      {person.name} {person.number}{" "}
    </span>
    <Button text="delete" onClick={onDelete} className="btn del-btn" />
  </li>
);
