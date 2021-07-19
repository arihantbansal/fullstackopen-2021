import React from "react";

const PersonForm = ({ submit, newName, getName, newNumber, getNumber }) => {
  return (
    <form onSubmit={submit}>
      <div>
        <label className="label">Name :</label>
        <input className="input" value={newName} onChange={getName} />
      </div>
      <div>
        <label className="label">Number :</label>
        <input className="input" value={newNumber} onChange={getNumber} />
      </div>
      <div>
        <button className="button submit" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
