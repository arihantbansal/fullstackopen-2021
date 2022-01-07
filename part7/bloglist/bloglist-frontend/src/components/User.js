import React from "react";
import { Box, Heading, UnorderedList, ListItem } from "@chakra-ui/react";

const User = ({ user }) => {
	if (!user) return null;

	return (
		<Box>
			<Heading as="h2">{user.name}</Heading>
			<Heading as="h3">Added blogs: </Heading>
			<UnorderedList>
				{user.blogs.map(blog => (
					<ListItem key={blog.id}>{blog.title}</ListItem>
				))}
			</UnorderedList>
		</Box>
	);
};

export default User;
