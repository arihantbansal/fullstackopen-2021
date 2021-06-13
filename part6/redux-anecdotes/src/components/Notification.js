import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
	const notification = useSelector(state => state.notification.message);

	return (
		<>{notification && <div className="notification">{notification}</div>}</>
	);
};

export default Notification;
