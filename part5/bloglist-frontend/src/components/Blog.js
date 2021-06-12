import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
	const [showDetails, setShowDetails] = useState(false);

	const updateLikes = () => {
		const { id, author, url, title } = blog;
		console.log(blog);

		const updatedBlog = {
			user: blog.user,
			likes: blog.likes + 1,
			title,
			author,
			url,
		};

		updateBlog(id, updatedBlog);
	};

	const deleteBlog = () => {
		const { id } = blog;
		removeBlog(id);
	};

	return (
		<div className="blog">
			<p>
				<span className="blog-title">{blog.title}</span>{" "}
				<span className="blog-author">{blog.author} &emsp;</span>
				<button
					className="blog-show-btn"
					onClick={() => setShowDetails(!showDetails)}>
					{showDetails ? "hide" : "view"}
				</button>
			</p>
			{showDetails && (
				<div className="blog-details">
					<p className="blog-url">URL: {blog.url}</p>
					<p className="blog-likes">
						Likes: {blog.likes} &emsp;
						<button className="blog-like-btn" onClick={() => updateLikes()}>
							Like
						</button>
					</p>
					<p className="blog-user">User: {blog.user.name}</p>

					{blog.user.username === user.username && (
						<button className="blog-user-btn" onClick={deleteBlog}>
							Remove
						</button>
					)}
				</div>
			)}
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.shape({
		title: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		likes: PropTypes.number,
	}),
	updateBlog: PropTypes.func.isRequired,
	removeBlog: PropTypes.func.isRequired,
	user: PropTypes.shape({
		token: PropTypes.string,
		username: PropTypes.string,
		name: PropTypes.string,
	}),
};

export default Blog;
