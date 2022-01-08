import React, { useState } from "react";
import Select from "react-select";
import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries";

const SetBirthYear = ({ options }) => {
	const [name, setName] = useState("");
	const [born, setBorn] = useState("");

	const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});

	const submit = async event => {
		event.preventDefault();

		updateAuthor({
			variables: { name, born },
		});

		setName("");
		setBorn("");
	};

	return (
		<div>
			<h2>Set birthyear</h2>
			<form onSubmit={submit}>
				<Select
					placeholder="Select author..."
					options={options}
					onChange={({ label }) => setName(label)}
				/>
				<div>
					born
					<input
						type="number"
						value={born}
						onChange={({ target }) => setBorn(Number(target.value))}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	);
};

export default SetBirthYear;
