import { useState, useEffect } from "react";
import { PersonForm } from "./components/PersonForm";
import { ContactFilter } from "./components/ContactFilter";
import { Persons } from "./components/Persons";
import personsService from "./services/persons";
import helpers from "./utils/helpers";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filterPattern, setFilterPattern] = useState("");
  const [formMsg, setFormMsg] = useState(null);
  const [personsMsg, setPersonsMsg] = useState(null);

  const resetNewPerson = () => setNewPerson({ name: "", number: "" });

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterPattern)
  );

  useEffect(() => {
    personsService
      .getAllPersons()
      .then((newPersons) => {
        setPersons(newPersons);
      })
      .catch((error) => {
        console.log("Cannot fetch contacts list ", error);
        setPersons([]);
        const erMsg = "Cannot download contacts 😞 Please, try again later!";
        setPersonsMsg({ text: erMsg, type: "error" });
      });
  }, []);

  const handleAddBtnClick = (evt) => {
    evt.preventDefault();

    if (!newPerson.name || !newPerson.number) {
      const txt = "Please, fill in all fields";
      notifyUserShortly(setFormMsg, txt, "error");
    } else if (helpers.isNameInPersons(persons, newPerson.name)) {
      confirmAndUpdatePerson();
    } else if (helpers.isNumberInPersons(persons, newPerson.number)) {
      const txt = `${newPerson.number} is already in the phonebook`;
      notifyUserShortly(setFormMsg, txt, "error");
    } else {
      addNewPerson();
    }
  };

  const addNewPerson = () => {
    const newPersonObj = {
      name: newPerson.name.trim(),
      number: newPerson.number,
    };

    personsService
      .createPerson(newPersonObj)
      .then((returnedPerson) => {
        const msg = `${newPersonObj.name}'s contact is successfully saved`;
        notifyUserShortly(setFormMsg, msg);
        setPersons(persons.concat(returnedPerson));
        resetNewPerson();
      })
      .catch((error) => {
        console.log("Cannot post new person to the server ", error);
        let msg = "Unable to add new contact. Please, try again later";

        if (error.response?.data?.error) {
          msg = error.response?.data?.error;
        }

        notifyUserShortly(setFormMsg, msg, "error");
      });
  };

  const confirmAndUpdatePerson = () => {
    if (
      window.confirm(
        `${newPerson.name} is already on the phonebook. Would you like to replace the phone number with the new one?`
      )
    ) {
      const oldPersonObj = helpers.findPersonByName(persons, newPerson.name);
      const id = oldPersonObj.id;
      const changedPersonObj = { ...oldPersonObj, number: newPerson.number };

      personsService
        .updatePerson(changedPersonObj)
        .then((returnedPerson) => {
          const msg = `${oldPersonObj.name}'s contact is successfully updated`;
          notifyUserShortly(setFormMsg, msg);
          setPersons(
            persons.map((person) =>
              person.id === id ? returnedPerson : person
            )
          );
          resetNewPerson();
        })
        .catch((error) => {
          console.log("Cannot put changed contact to the server ", error);
          const msg = `${oldPersonObj.name}'s contact has been removed from the server`;
          notifyUserShortly(setFormMsg, msg, "error");
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const notifyUserShortly = (setFn, text, type = "success") => {
    setFn({ text, type });
    setTimeout(() => setFn(null), 3000);
  };

  const handleNameInputChange = (event) => {
    const newName = event.target.value;
    setNewPerson((prevPersonInfo) => ({
      ...prevPersonInfo,
      name: newName,
    }));
  };

  const handlePhoneInputChange = (event) => {
    const pattern = /[^\d-]/g;
    const newNumber = event.target.value.replace(pattern, "");
    setNewPerson((prevPersonInfo) => ({
      ...prevPersonInfo,
      number: newNumber,
    }));
  };

  const handleFilterInputChange = (event) => {
    setFilterPattern(event.target.value.trim().toLowerCase());
  };

  const handleDelete = (personId) => {
    const name = helpers.findPersonById(persons, personId).name;
    if (window.confirm(`Are you sure you want to delete ${name}'s contact?`)) {
      personsService
        .deletePerson(personId)
        .then((deletedId) => {
          const msg = `${name}'s contact is successfully deleted from the server`;
          notifyUserShortly(setPersonsMsg, msg);
          setPersons(persons.filter((person) => person.id !== deletedId));
        })
        .catch((error) => {
          console.log("Cannot delete person ", error);
          const msg = `${name}'s contact has already been removed from the server`;
          notifyUserShortly(setPersonsMsg, msg, "error");
          setPersons(persons.filter((person) => person.id !== personId));
        });
    }
  };

  return (
    <>
      <h1 className="title">Phonebook</h1>
      <div className="content">
        <h2 className="subtitle">Add new contact:</h2>
        <PersonForm
          onAddPerson={handleAddBtnClick}
          newName={newPerson.name}
          onNameInputChange={handleNameInputChange}
          newNumber={newPerson.number}
          onPhoneInputChange={handlePhoneInputChange}
        />
        {formMsg && (
          <Notification className={formMsg.type} msg={formMsg.text} />
        )}
        <h2 className="subtitle">Contacts:</h2>
        <ContactFilter
          filterValue={filterPattern}
          onFilterInputChange={handleFilterInputChange}
        />
        {personsMsg && (
          <Notification className={personsMsg.type} msg={personsMsg.text} />
        )}
        <Persons persons={personsToShow} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default App;
