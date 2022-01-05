import React, { useState } from "react";
import InputField from "./InputField";

const BlogPage = ({ blog, updateBlog }) => {
	const [comment, setComment] = useState("");

	if (!blog) return null;

	const updateLikes = () => {
		const { id, author, url, comments, title } = blog;

		const updatedBlog = {
			user: blog.user,
			likes: blog.likes + 1,
			title,
			author,
			url,
			comments,
		};

		updateBlog(id, updatedBlog);
	};

	const updateComments = () => {
		const { id, likes, author, url, title } = blog;

		const updatedBlog = {
			user: blog.user,
			likes: likes,
			title,
			author,
			url,
			comments: [...blog.comments, comment],
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
			</div>

			<div>
				<h3>Comments: </h3>
				<form
					onSubmit={e => {
						e.preventDefault();
						updateComments();
					}}>
					<span>
						<InputField
							htmlFor={"comment"}
							type="text"
							value={comment}
							name="Comment"
							label="Comment"
							onChange={({ target }) => setComment(target.value)}
						/>
						<button type="submit">Add Comment</button>
					</span>
				</form>
				<ul>
					{blog.comments.map(comment => (
						<li key={comment}>{comment}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default BlogPage;
