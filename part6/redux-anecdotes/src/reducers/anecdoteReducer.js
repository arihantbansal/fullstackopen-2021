const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteReducer = (state = [], action) => {
	switch (action.type) {
		case "NEW_ANECDOTE":
			return [...state, action.data];
		case "INIT_ANECDOTES":
			return action.data;
		case "VOTE":
			const id = action.data.id;
			const anecdoteToChange = state.find(a => a.id === id);
			const changedAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1,
			};
			return state.map(anecdote =>
				anecdote.id !== id ? anecdote : changedAnecdote
			);
		default:
			return state;
	}
};

export const createAnecdote = data => {
	return {
		type: "NEW_ANECDOTE",
		data,
	};
};

export const voteAnecdote = id => {
	return {
		type: "VOTE",
		data: { id },
	};
};

export const initializeAnecdotes = anecdotes => {
	return {
		type: "INIT_ANECDOTES",
		data: anecdotes,
	};
};

export default anecdoteReducer;
