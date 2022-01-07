import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { logoutUser, setUser } from "redux/userReducer";
import LoginForm from "./LoginForm";

const Navbar = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	useEffect(() => {
		dispatch(setUser());
	}, [dispatch]);

	return (
		<Box>
			<Box>
				<Text as="span">
					<Link to="/">blogs</Link>
					&emsp;
				</Text>
				<Text as="span">
					<Link to="/users">users</Link>
					&emsp;
				</Text>
				<Box as="span">
					{user === null ? (
						<LoginForm />
					) : (
						<Box as="span">
							{user.name} logged in &emsp;
							<Button
								onClick={event => {
									event.preventDefault();
									dispatch(logoutUser());
								}}>
								Logout
							</Button>
						</Box>
					)}
				</Box>
			</Box>

			<Heading as="h2">Blog App</Heading>
		</Box>
	);
};

export default Navbar;
