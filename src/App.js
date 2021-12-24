import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newPhone,
    };

    let repeatedName = persons.find((person) => person.name === newName);

    if (repeatedName === undefined) {
      personService.create(newPerson).then((newPersonInfo) => {
        setPersons(persons.concat(newPersonInfo));
        setNotification(`Added ${newPersonInfo.name}`);
        setTimeout(() => setNotification(null), 5000);
        setNewName("");
        setNewPhone("");
      });
    } else {
      const confirmation = window.confirm(`${repeatedName.name} is already added to phonebook, replace the old number with a new one?`);
      if (confirmation) {
        personService
          .update(repeatedName.id, newPerson)
          .then((updatedNewPhone) => {
            setNewPhone(updatedNewPhone.number);
            const i = persons.findIndex((person) => person.name === repeatedName.name);
            const copiedArrayPersons = [...persons];
            copiedArrayPersons[i].number = updatedNewPhone.number;
            setPersons(copiedArrayPersons);
            setNotification("Telephone number updated");
            setTimeout(() => setNotification(null), 5000);
            setNewPhone("");
          })
          .catch((error) => {
            setNotification(`Information of ${repeatedName.name} has already been removed from server`);
            const $notification = document.querySelector(".notification");
            $notification.style.color = "red";
            setTimeout(() => setNotification(null), 5000);
          });
        setNewName("");
        setNewPhone("");
      } else {
        setNewPhone("");
        setNewName("");
      }
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.target.value) {
      let wanted = persons.filter((person) => person.name.toLowerCase().startsWith(e.target.value.toLowerCase()));
      setSearch([...wanted]);
    } else {
      setSearch([]);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter search={search} handleSearch={handleSearch} />
      <h3>add a new</h3>
      <Form newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} />
    </div>
  );
}

export default App;
