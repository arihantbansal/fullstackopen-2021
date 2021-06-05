import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [personsToShow, setPersonsToShow] = useState(persons);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then(initialPersons => {
			console.log("persons initialised");
			setPersons(initialPersons);
			setPersonsToShow(initialPersons);
		});
	}, []);

	const getName = event => {
		setNewName(event.target.value);
	};

	const getNumber = event => {
		setNewNumber(event.target.value);
	};

	const addPerson = event => {
		event.preventDefault();

		const namesMatch = (person1, person2) =>
			person1.toLowerCase() === person2.toLowerCase();

		const person = persons.find(person => namesMatch(person.name, newName));

		if (person) {
			// Error handling for if the updated number is too short.
			if (newNumber < 8) {
				setMessage({
					error: `${newNumber} is too short, please provide a number with at least 8 digits`,
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
				return;
			}

			if (
				window.confirm(
					`${newName} is already added to phonebook, do you want to replace the old number with the new one?`
				)
			) {
				const personObject = {
					name: newName,
					number: newNumber,
				};

				personService
					.update(person.id, personObject)
					.then(returnedPerson => {
						setMessage({
							text: `Updated ${returnedPerson.name}'s number`,
							type: "success",
						});
						setTimeout(() => {
							setMessage(null);
						}, 5000);
						setPersons(
							persons
								.filter(person => person.name !== newName)
								.concat(returnedPerson)
						);
						setPersonsToShow(
							personsToShow.filter(person => person.name === newName)
								? personsToShow
										.filter(person => person.name !== newName)
										.concat(returnedPerson)
								: personsToShow
						);
						setNewName("");
						setNewNumber("");
					})
					.catch(error => {
						setPersons(persons.filter(p => p.name !== person.name));
						setMessage({
							text: `Information for ${person.name} has already been deleted from the server`,
							type: "error",
						});
						setTimeout(() => {
							setMessage(null);
						}, 5000);
					});
			}
			return;
		}

		const personObject = {
			name: newName,
			number: newNumber,
		};

		personService
			.create(personObject)
			.then(returnedPerson => {
				setPersons(persons.concat(personObject));
				setPersonsToShow(persons.concat(personObject));
				setMessage({
					text: `Added ${returnedPerson.name}`,
					type: "success",
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
				setNewName("");
				setNewNumber("");
			})
			.catch(error => {
				setMessage({ text: `${error.response.data.error}`, type: "error" });
				setTimeout(() => {
					setMessage(null);
				}, 5000);
				console.error(error);
				setNewName("");
				setNewNumber("");
			});
	};

	const deletePerson = (id, name) => {
		if (window.confirm(`Are you sure you want to delete ${name}?`)) {
			personService.remove(id);
			setPersons(persons.filter(person => person.id !== id));
			setPersonsToShow(personsToShow.filter(person => person.id !== id));
		}
	};

	const filterContent = event => {
		if (event.target.value === "") {
			setPersonsToShow(persons);
			return;
		}
		const showPersons = persons.filter(person =>
			person.name.toLowerCase().includes(event.target.value)
		);
		setPersonsToShow(showPersons);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />

			<Filter filterContent={filterContent} />

			<h3>Add a new</h3>
			<PersonForm
				submit={addPerson}
				newName={newName}
				newNumber={newNumber}
				getName={getName}
				getNumber={getNumber}
			/>

			<h3>Numbers</h3>
			<Persons persons={personsToShow} handleDelete={deletePerson} />
		</div>
	);
};

export default App;
