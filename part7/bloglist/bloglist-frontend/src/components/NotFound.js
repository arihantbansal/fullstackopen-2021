import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div>
			404 Not Found
			<div>
				<Link to="/">Go back home</Link>
			</div>
		</div>
	);
};

export default NotFound;
