import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = props => {
	const dispatch = useDispatch();

	const addNote = event => {
		event.preventDefault();
		const content = event.target.note.value;
		event.target.note.value = "";
		dispatch(createAnecdote(content));
	};

	return (
		<form onSubmit={addNote}>
			<input type="text" name="note" />
			<button type="submit">add</button>
		</form>
	);
};

export default AnecdoteForm;
