import React from "react";

const BlogPage = ({ blog, updateBlog }) => {
	if (!blog) return null;

	const updateLikes = () => {
		const { id, author, url, title } = blog;

		const updatedBlog = {
			user: blog.user,
			likes: blog.likes + 1,
			title,
			author,
			url,
		};

		updateBlog(id, updatedBlog);
	};

	return (
		<div>
			<h2>{blog.title}</h2>
			<div>
				<a href={blog.url}>{blog.url}</a>
				<p>
					{blog.likes} likes <button onClick={() => updateLikes()}>like</button>
				</p>
				<p>added by {blog.author}</p>

				<h3>Comments: </h3>
				<ul>
					{blog?.comments.map(comment => (
						<li key={comment}>{comment}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default BlogPage;
