import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);

	const [notificationMessage, setNotificationMessage] = useState(null);
	const [notificationType, setNotificationType] = useState(null);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem(
			"loggedBlogListAppUser"
		);
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const addBlog = blogObject => {
		blogService.create(blogObject).then(returnedBlog => {
			setBlogs(blogs.concat(returnedBlog));
			setNotificationMessage(
				`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
			);
			setNotificationType("success");
			setTimeout(() => {
				setNotificationMessage(null);
				setNotificationType(null);
			}, 5000);
		});
	};

	const addLike = async (id, blogObject) => {
		try {
			await blogService.update(id, blogObject);

			const updatedBlog = {
				...blogObject,
				id,
			};

			setBlogs(blogs.map(blog => (blog.id !== id ? blog : updatedBlog)));
		} catch (exception) {
			console.error(exception);
			setNotificationMessage(`error: Oopsie ${exception}`);
			setNotificationType("error");
			setTimeout(() => {
				setNotificationMessage(null);
				setNotificationType(null);
			}, 5000);
		}
	};

	const deleteBlog = async id => {
		try {
			const blog = blogs.filter(blog => blog.id === id);

			if (
				window.confirm(
					`Remove blog ${blog[0].title} by ${blog[0].author}`
				)
			) {
				await blogService.deleteBlog(id);

				setBlogs(blogs.filter(blog => blog.id !== id));
			}
		} catch (exception) {
			console.error(exception);
			setNotificationMessage(`error: Oopsie ${exception}`);
			setNotificationType("error");
			setTimeout(() => {
				setNotificationType(null);
				setNotificationMessage(null);
			});
		}
	};

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				Username: &emsp;
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				Password: &emsp;
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">Login</button>
		</form>
	);

	const blogForm = () => (
		<Togglable buttonLabel="Create New Blog">
			<BlogForm createBlog={addBlog} />
		</Togglable>
	);

	const handleLogin = async event => {
		event.preventDefault();

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
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			setNotificationMessage("Wrong credentials");
			setNotificationType("error");
			setTimeout(() => {
				setNotificationMessage(null);
				setNotificationType(null);
			}, 5000);
		}
	};

	const handleLogout = async event => {
		event.preventDefault();

		window.localStorage.removeItem("loggedBlogListAppUser");
		blogService.setToken(null);
		setUser(null);
		setUsername("");
		setPassword("");
	};

	return (
		<div>
			<h2>Blogs</h2>
			<Notification
				message={notificationMessage}
				type={notificationType}
			/>
			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>
						{user.name} logged in &emsp;
						<button onClick={event => handleLogout(event)}>
							Logout
						</button>
					</p>
					{blogForm()}
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map(blog => (
							<Blog
								key={blog.id}
								blog={blog}
								updateBlog={addLike}
								removeBlog={deleteBlog}
								user={user}
							/>
						))}
				</div>
			)}
		</div>
	);
};

export default App;
