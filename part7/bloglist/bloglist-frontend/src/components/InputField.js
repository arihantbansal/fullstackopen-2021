import React from "react";
import PropTypes from "prop-types";
import { Box, FormLabel, Input } from "@chakra-ui/react";

const InputField = ({ htmlFor, label, type, value, onChange, name }) => (
	<Box as="span" className="container">
		{/* Add label with htmlFor for accessibility, id on input associates label with input element */}
		<FormLabel className="label" htmlFor={htmlFor}>
			{label}
		</FormLabel>
		<Input
			type={type}
			name={name}
			className="input"
			id={htmlFor}
			value={value}
			onChange={onChange}
		/>
	</Box>
);

export default InputField;

InputField.propTypes = {
	htmlFor: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string,
};
