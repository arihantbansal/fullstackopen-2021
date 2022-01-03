import React from "react";

const Notification = ({ notification }) => {
	const { message, type } = notification;

	return <>{message && <div className={type}>{message}</div>}</>;
};

export default Notification;
