import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import Blog from "components/Blog";
import Notification from "components/Notification";
import BlogForm from "components/BlogForm";
import Togglable from "components/Togglable";
import Navbar from "components/Navbar";
import Users from "components/Users";

import { setSuccessMessage, setErrorMessage } from "redux/notificationReducer";
import {
	initializeBlogs,
	addBlog,
	deleteBlog,
	likeBlog,
} from "redux/blogReducer";
import { setUser } from "redux/userReducer";

const App = () => {
	const dispatch = useDispatch();

	const blogs = useSelector(state => state.blogs);
	const notification = useSelector(state => state.notification);
	const user = useSelector(state => state.user);

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

	const blogForm = () => (
		<Togglable buttonLabel="Create New Blog">
			<BlogForm createBlog={createBlog} />
		</Togglable>
	);

	return (
		<div>
			<Navbar />
			<Notification notification={notification} />
			<Switch>
				<Route path="/users">
					<Users />
				</Route>
				<Route path="/">
					{user === null ? null : (
						<div>
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
				</Route>
			</Switch>
		</div>
	);
};

export default App;
