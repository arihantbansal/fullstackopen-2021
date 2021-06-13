import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
	removeNotification,
	setNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<div className="anecdote-container">
			<div>{anecdote.content}</div>
			<div className="vote-container">
				<span className="votes">has {anecdote.votes}</span>
				<button onClick={handleClick} className="vote-btn">
					Vote
				</button>
			</div>
		</div>
	);
};

const AnecdoteList = () => {
	const dispatch = useDispatch();
	const anecdotes = useSelector(state => {
		if (state.filter.filter === "") return state.anecdotes;

		return state.anecdotes
			.filter(anecdote =>
				anecdote.content
					.toLowerCase()
					.includes(state.filter.filter.toLowerCase())
			)
			.sort((a, b) => (a.votes > b.votes ? -1 : 1));
	});

	const vote = anecdote => {
		dispatch(voteAnecdote(anecdote.id));
		dispatch(setNotification({ message: `You voted '${anecdote.content}'` }));

		setTimeout(() => {
			dispatch(removeNotification());
		}, 5000);
	};

	return (
		<div>
			{anecdotes.map(anecdote => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => vote(anecdote)}
				/>
			))}
		</div>
	);
};

export default AnecdoteList;
