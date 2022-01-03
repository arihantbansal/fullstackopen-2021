const notificationReducer = (
	state = {
		message: null,
		type: null,
	},
	action
) => {
	switch (action.type) {
		case "SET_NOTIFICATION":
			return action.data;
		case "CLEAR_NOTIFICATION":
			return {
				message: null,
				type: null,
			};
		default:
			return state;
	}
};

const clearMessage = dispatch => {
	setTimeout(() => {
		dispatch({
			type: "CLEAR_NOTIFICATION",
		});
	}, 5000);
};

export const setSuccessMessage = message => {
	return async dispatch => {
		dispatch({
			type: "SET_NOTIFICATION",
			data: {
				message: message,
				type: "success",
			},
		});
		clearMessage(dispatch);
	};
};

export const setErrorMessage = message => {
	return async dispatch => {
		dispatch({
			type: "SET_NOTIFICATION",
			data: {
				message: message,
				type: "error",
			},
		});
		clearMessage(dispatch);
	};
};

export default notificationReducer;
