import React from "react";
import { Box } from "@chakra-ui/react";

const Notification = ({ notification }) => {
	const { message, type } = notification;

	return <>{message && <Box className={type}>{message}</Box>}</>;
};

export default Notification;
