import React, { useState } from "react";
import {
	Box,
	Heading,
	Text,
	Button,
	FormControl,
	UnorderedList,
	ListItem,
	Link as ExternalLink,
} from "@chakra-ui/react";
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
				<ExternalLink href={blog.url}>{blog.url}</ExternalLink>
				<Text as="p">
					{blog.likes} likes <Button onClick={() => updateLikes()}>like</Button>
				</Text>
				<Text as="p">added by {blog.author}</Text>
			</Box>

			<Box>
				<Heading as="h3">Comments: </Heading>
				<FormControl
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
						<Button type="submit">Add Comment</Button>
					</Text>
				</FormControl>
				<UnorderedList>
					{blog.comments.map(comment => (
						<ListItem key={comment}>{comment}</ListItem>
					))}
				</UnorderedList>
			</Box>
		</Box>
	);
};

export default BlogPage;
