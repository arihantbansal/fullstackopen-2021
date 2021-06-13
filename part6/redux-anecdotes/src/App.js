import React, { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import anecdoteService from "./services/anecdotes";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import "./App.css";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		anecdoteService
			.getAll()
			.then(anecdotes => dispatch(initializeAnecdotes(anecdotes)));
	}, [dispatch]);

	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<Filter />
			<AnecdoteList />
			<h2>Create New</h2>
			<AnecdoteForm />
		</div>
	);
};

export default App;
