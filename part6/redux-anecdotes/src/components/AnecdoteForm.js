import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = props => {
	const dispatch = useDispatch();

	const addAnecdote = async event => {
		event.preventDefault();
		const content = event.target.note.value;
		event.target.note.value = "";
		dispatch(createAnecdote(content));

		dispatch(setNotification("Successfully added anecdote", 5));
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
