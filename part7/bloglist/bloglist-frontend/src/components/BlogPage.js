import React, { useState } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
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
		<Box>
			<Heading as="h2">{blog.title}</Heading>
			<Box>
				<a href={blog.url}>{blog.url}</a>
				<Text as="p">
					{blog.likes} likes <Button onClick={() => updateLikes()}>like</Button>
				</Text>
				<Text as="p">added by {blog.author}</Text>
			</Box>

			<Box>
				<Heading as="h3">Comments: </Heading>
				<form
					onSubmit={e => {
						e.preventDefault();
						updateComments();
					}}>
					<Text as="span">
						<InputField
							htmlFor={"comment"}
							type="text"
							value={comment}
							name="Comment"
							label="Comment"
							onChange={({ target }) => setComment(target.value)}
						/>
						<button type="submit">Add Comment</button>
					</Text>
				</form>
				<ul>
					{blog.comments.map(comment => (
						<li key={comment}>{comment}</li>
					))}
				</ul>
			</Box>
		</Box>
	);
};

export default BlogPage;
