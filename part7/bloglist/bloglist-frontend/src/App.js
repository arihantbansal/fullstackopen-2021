import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import InputField from "./components/InputField";

import {
	setSuccessMessage,
	setErrorMessage,
} from "./redux/notificationReducer";
import {
	initializeBlogs,
	addBlog,
	deleteBlog,
	likeBlog,
} from "./redux/blogReducer";
import { loginUser, logoutUser, setUser } from "./redux/userReducer";

const App = () => {
	const dispatch = useDispatch();

	const blogs = useSelector(state => state.blogs);
	const notification = useSelector(state => state.notification);
	const user = useSelector(state => state.user);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		dispatch(initializeBlogs());
	}, [dispatch]);

	useEffect(() => {
		dispatch(setUser());
	}, [dispatch]);

	const createBlog = blogObject => {
		dispatch(addBlog(blogObject));
		dispatch(
			setSuccessMessage(
				`a new blog ${blogObject.title} by ${blogObject.author} added`
			)
		);
	};

	const addLike = async (id, blogObject) => {
		try {
			dispatch(likeBlog(id, blogObject));
		} catch (exception) {
			console.error(exception);
			dispatch(setErrorMessage(`error: Oopsie ${exception}`));
		}
	};

	const removeBlog = async id => {
		try {
			const blog = blogs.find(blog => blog.id === id);
			dispatch(deleteBlog(id, blog));
		} catch (exception) {
			console.error(exception);
			dispatch(setErrorMessage(`error: Oopsie ${exception}`));
		}
	};

	const loginForm = () => (
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

	const blogForm = () => (
		<Togglable buttonLabel="Create New Blog">
			<BlogForm createBlog={createBlog} />
		</Togglable>
	);

	return (
		<div>
			<h2>Blogs</h2>
			<Notification notification={notification} />
			{user === null ? (
				loginForm()
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
					{blogForm()}
					<div className="blogs">
						{blogs
							.sort((a, b) => b.likes - a.likes)
							.map(blog => (
								<Blog
									key={blog.id}
									blog={blog}
									updateBlog={addLike}
									removeBlog={removeBlog}
									user={user}
								/>
							))}
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
