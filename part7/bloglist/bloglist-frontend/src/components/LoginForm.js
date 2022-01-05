import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputField from "./InputField";
import { loginUser } from "../redux/userReducer";

const LoginForm = () => {
	const dispatch = useDispatch();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<form
			onSubmit={() => {
				dispatch(loginUser(username, password));
			}}>
			<div>
				<InputField
					type="text"
					value={username}
					name="Username"
					label="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				<InputField
					type="password"
					value={password}
					name="Password"
					label="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">Login</button>
		</form>
	);
};

export default LoginForm;
