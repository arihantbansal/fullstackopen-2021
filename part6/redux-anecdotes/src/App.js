import React from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import "./App.css";

const App = () => {
	return (
		<div>
			<h2>Anecdotes</h2>
			<AnecdoteForm />
			<AnecdoteList />
		</div>
	);
};

export default App;
