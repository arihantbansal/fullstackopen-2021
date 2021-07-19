import React from "react";

const Person = ({ person, handleDelete }) => {
  return (
    <p className="person">
      <span className="person-name">{person.name}</span>
      <span className="person-number">{person.number}</span>
      <button
        className="button"
        onClick={() => handleDelete(person.id, person.name)}
      >
        Delete
      </button>
    </p>
  );
};

export default Person;
