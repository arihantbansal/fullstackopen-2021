import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
	setNotification,
	removeNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = props => {
	const dispatch = useDispatch();

	const addAnecdote = async event => {
		event.preventDefault();
		const content = event.target.note.value;
		event.target.note.value = "";
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(createAnecdote(newAnecdote));

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
