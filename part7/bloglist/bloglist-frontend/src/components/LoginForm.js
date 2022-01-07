import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, FormControl, Button } from "@chakra-ui/react";
import InputField from "./InputField";
import { loginUser } from "redux/userReducer";

const LoginForm = () => {
	const dispatch = useDispatch();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<FormControl
			onSubmit={e => {
				e.preventDefault();
				dispatch(loginUser(username, password));
			}}>
			<Box>
				<InputField
					htmlFor={"username"}
					type="text"
					value={username}
					name="Username"
					label="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</Box>
			<Box>
				<InputField
					htmlFor={"password"}
					type="password"
					value={password}
					name="Password"
					label="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</Box>
			<Button type="submit">Login</Button>
		</FormControl>
	);
};

export default LoginForm;
