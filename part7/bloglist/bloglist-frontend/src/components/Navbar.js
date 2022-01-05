import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
			<h2>Blogs</h2>
			{user === null ? (
				<LoginForm />
			) : (
				<div>
					<p>
						{user.name} logged in &emsp;
						<button
							onClick={event => {
								event.preventDefault();
								dispatch(logoutUser());
							}}>
							Logout
						</button>
					</p>
				</div>
			)}
		</div>
	);
};

export default Navbar;
