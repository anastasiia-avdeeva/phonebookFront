import { InputGroup } from "./InputGroup";
import { Button } from "./button";

export const PersonForm = (props) => {
  return (
    <form className="person-form" onSubmit={props.onAddPerson}>
      <InputGroup
        labelText="Contact name: "
        inputProps={{
          type: "text",
          id: "nameInput",
          name: "name",
          value: props.newName,
          onChange: props.onNameInputChange,
        }}
      />
      <InputGroup
        labelText="Phone number: "
        inputProps={{
          type: "tel",
          id: "phoneInput",
          name: "number",
          minLength: "3",
          maxLength: "20",
          value: props.newNumber,
          onChange: props.onPhoneInputChange,
        }}
      />
      <Button text="add" type="submit" className="btn add-btn" />
    </form>
  );
};
