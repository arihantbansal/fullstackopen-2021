import axios from "axios";

const baseUrl = "/api/users";

const getAllUsers = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const getUser = async username => {
	const response = await axios.get(`${baseUrl}/${username}`);
	return response.data;
};

export default { getAllUsers, getUser };
