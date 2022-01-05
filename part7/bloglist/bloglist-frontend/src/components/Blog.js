import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Blog = ({ blog }) => {
	return (
		<div className="blog">
			<p>
				<Link to={`/blogs/${blog.id}`}>
					<span className="blog-title">{blog.title}</span>{" "}
					<span className="blog-author">{blog.author}</span>
				</Link>
				&emsp;
			</p>
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
