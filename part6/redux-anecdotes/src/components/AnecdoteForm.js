import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
	setNotification,
	removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = props => {
	const dispatch = useDispatch();

	const addAnecdote = event => {
		event.preventDefault();
		const content = event.target.note.value;
		event.target.note.value = "";
		dispatch(createAnecdote(content));

		dispatch(setNotification({ message: `Successfully added anecdote` }));

		setTimeout(() => {
			dispatch(removeNotification());
		}, 5000);
	};

	return (
		<form onSubmit={addAnecdote}>
			<input type="text" name="note" className="anecdote-input" />
			<button type="submit" className="submit-btn">
				Add
			</button>
		</form>
	);
};

export default AnecdoteForm;
