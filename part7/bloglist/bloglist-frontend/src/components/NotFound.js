import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const NotFound = () => {
	return (
		<Box>
			404 Not Found
			<Box>
				<Link to="/">Go back home</Link>
			</Box>
		</Box>
	);
};

export default NotFound;
