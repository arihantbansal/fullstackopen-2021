import usersService from "../services/users";

const allUsersReducer = (state = [], action) => {
	switch (action.type) {
		case "GET_USERS":
			return action.users;
		default:
			return state;
	}
};

export const getAllUsers = () => {
	return async dispatch => {
		const users = await usersService.getAllUsers();
		dispatch({
			type: "GET_USERS",
			data: users,
		});
	};
};

export default allUsersReducer;
