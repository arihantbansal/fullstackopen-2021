import anecdoteService from "../services/anecdotes";

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

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch({
			type: "NEW_ANECDOTE",
			data: newAnecdote,
		});
	};
};

export const voteAnecdote = votedAnecdote => {
	return async dispatch => {
		const anecdote = {
			...votedAnecdote,
			votes: votedAnecdote.votes + 1,
		};

		const updatedAnecdote = await anecdoteService.update(anecdote);
		const { id } = updatedAnecdote;
		dispatch({
			type: "VOTE",
			data: { id },
		});
	};
};

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll();
		dispatch({
			type: "INIT_ANECDOTES",
			data: anecdotes,
		});
	};
};
export default anecdoteReducer;
