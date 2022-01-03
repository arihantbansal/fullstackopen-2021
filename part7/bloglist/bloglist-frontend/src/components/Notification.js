import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
	const { message, type } = useSelector(state => state.notification);

	return <>{message && <div className={type}>{message}</div>}</>;
};

export default Notification;
