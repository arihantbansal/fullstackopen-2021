import React, { useState } from "react";
import PropTypes from "prop-types";

const Togglable = props => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	return (
		<div>
			<div className="toggle" style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div className="toggled" style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>Cancel</button>
			</div>
		</div>
	);
};

Togglable.displayName = "Togglable";

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
