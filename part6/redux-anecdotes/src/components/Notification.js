import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
	const notification = useSelector(state => state.notification);
	console.log({ notification });
	return notification ? (
		<div className="notification">{notification}</div>
	) : null;
};

export default Notification;
