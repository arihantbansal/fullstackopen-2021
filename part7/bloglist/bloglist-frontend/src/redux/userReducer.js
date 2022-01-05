import loginService from "services/login";
import blogService from "services/blogs";
import { setErrorMessage, setSuccessMessage } from "./notificationReducer";

const userReducer = (state = null, action) => {
	switch (action.type) {
		case "LOGIN":
			return action.data;
		case "LOGOUT":
			return null;
		default:
			return state;
	}
};

export const setUser = () => {
	const loggedUserJSON = window.localStorage.getItem("loggedBlogListAppUser");
	if (loggedUserJSON) {
		const user = JSON.parse(loggedUserJSON);
		blogService.setToken(user.token);

		return {
			type: "LOGIN",
			data: user,
		};
	}
	return { type: "LOGOUT" };
};

export const logoutUser = () => {
	window.localStorage.removeItem("loggedBlogListAppUser");
	blogService.setToken(null);
	return { type: "LOGOUT" };
};

export const loginUser = (username, password) => {
	return async dispatch => {
		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem(
				"loggedBlogListAppUser",
				JSON.stringify(user)
			);
			blogService.setToken(user.token);
			dispatch(setUser());
			dispatch(setSuccessMessage(`${user.name} succesfully logged in`));
		} catch (error) {
			dispatch(setErrorMessage("Wrong credentials"));
		}
	};
};

export default userReducer;
