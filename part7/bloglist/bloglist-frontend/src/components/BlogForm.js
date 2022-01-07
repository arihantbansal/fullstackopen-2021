import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Heading, FormControl, Button } from "@chakra-ui/react";
import InputField from "./InputField";

const BlogForm = ({ createBlog }) => {
	const [inputValues, setInputValues] = useState(null);

	const handleInputChange = event => {
		const target = event.target;
		const { value, name } = target;

		setInputValues(prevValues => {
			return {
				...prevValues,
				[name]: value,
			};
		});
	};

	const addBlog = event => {
		event.preventDefault();
		try {
			const title = inputValues?.title;
			const author = inputValues?.author;
			const url = inputValues?.url;

			const blog = {
				title,
				author,
				url,
			};

			createBlog(blog);

			setInputValues({ title: "", author: "", url: "" });
		} catch (exception) {
			console.log(exception);
		}
	};

	return (
		<FormControl onSubmit={addBlog}>
			<Heading as="h2">Create New</Heading>
			<Box>
				<InputField
					type="text"
					value={inputValues?.title || ""}
					name="title"
					label="title"
					htmlFor="title"
					onChange={handleInputChange}
				/>
			</Box>

			<Box>
				<InputField
					type="text"
					value={inputValues?.author || ""}
					name="author"
					label="author"
					htmlFor="author"
					onChange={handleInputChange}
				/>
			</Box>

			<Box>
				<InputField
					type="text"
					value={inputValues?.url || ""}
					name="url"
					label="url"
					htmlFor="url"
					onChange={handleInputChange}
				/>
			</Box>
			<Button type="submit">Create</Button>
		</FormControl>
	);
};

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
