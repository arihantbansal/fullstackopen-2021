import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, setUser } from "redux/userReducer";
import LoginForm from "./LoginForm";

const Navbar = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	useEffect(() => {
		dispatch(setUser());
	}, [dispatch]);

	return (
		<div>
			<div>
				<span>
					<Link to="/">blogs</Link>
					&emsp;
				</span>
				<span>
					<Link to="/users">users</Link>
					&emsp;
				</span>
				<span>
					{user === null ? (
						<LoginForm />
					) : (
						<span>
							{user.name} logged in &emsp;
							<button
								onClick={event => {
									event.preventDefault();
									dispatch(logoutUser());
								}}>
								Logout
							</button>
						</span>
					)}
				</span>
			</div>

			<h2>Blog App</h2>
		</div>
	);
};

export default Navbar;
