import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Blog from "components/Blog";
import Notification from "components/Notification";
import BlogForm from "components/BlogForm";
import Togglable from "components/Togglable";
import Navbar from "components/Navbar";
import Users from "components/Users";
import User from "components/User";
import NotFound from "components/NotFound";

import { setSuccessMessage, setErrorMessage } from "redux/notificationReducer";
import {
	initializeBlogs,
	addBlog,
	deleteBlog,
	likeBlog,
} from "redux/blogReducer";
import { setUser } from "redux/userReducer";
import { getAllUsers } from "redux/allUsersReducer";
import BlogPage from "components/BlogPage";

const App = () => {
	const dispatch = useDispatch();

	const blogs = useSelector(state => state.blogs);
	const notification = useSelector(state => state.notification);
	const user = useSelector(state => state.user);
	const allUsers = useSelector(state => state.allUsers);

	useEffect(() => {
		dispatch(initializeBlogs());
		dispatch(setUser());
		dispatch(getAllUsers());
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

	//eslint-disable-next-line
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

	const match = useRouteMatch("/users/:id");
	const userMatch = match ? allUsers.find(a => a.id === match.params.id) : null;

	const matchBlog = useRouteMatch("/blogs/:id");
	const blog = matchBlog ? blogs.find(a => a.id === matchBlog.params.id) : null;

	return (
		<div>
			<Navbar />
			<Notification notification={notification} />
			<Switch>
				<Route path="/users/:id">
					<User user={userMatch} />
				</Route>
				<Route path="/users">
					<Users users={allUsers} />
				</Route>
				<Route path="/blogs/:id">
					<BlogPage blog={blog} updateBlog={addLike} />
				</Route>
				<Route exact path="/">
					{user === null ? null : (
						<div>
							{blogForm()}
							<div className="blogs">
								{blogs
									.sort((a, b) => b.likes - a.likes)
									.map(blog => (
										<Blog key={blog.id} blog={blog} />
									))}
							</div>
						</div>
					)}
				</Route>
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</div>
	);
};

export default App;
