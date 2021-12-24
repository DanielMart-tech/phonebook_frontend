import personService from "../services/persons";

const Person = ({ persons, setPersons, person }) => {
  const handleDelete = (id) => {
    const confirmation = window.confirm(`Delete ${person.name} ?`);
    if (confirmation) {
      personService.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <p>
      {person.name} {person.number}{" "}
      <input
        type="submit"
        value="delete"
        onClick={() => handleDelete(person.id)}
      />
    </p>
  );
};

const Persons = ({ persons, setPersons }) => {
  return (
    <>
      {persons.map((person) => (
        <Person
          persons={persons}
          setPersons={setPersons}
          person={person}
          key={person.id}
        />
      ))}
    </>
  );
};

export default Persons;
