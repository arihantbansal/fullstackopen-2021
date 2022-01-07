import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/react";

const Blog = ({ blog }) => {
	return (
		<Box className="blog">
			<Text as="p">
				<Link to={`/blogs/${blog.id}`}>
					<Text as="span" className="blog-title">
						{blog.title}
					</Text>{" "}
					<Text as="span" className="blog-author">
						{blog.author}
					</Text>
				</Link>
				&emsp;
			</Text>
		</Box>
	);
};

Blog.propTypes = {
	blog: PropTypes.shape({
		title: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		likes: PropTypes.number,
	}),
};

export default Blog;
