import React from "react";
import { Link } from "react-router-dom";
import {
	Box,
	Heading,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} from "@chakra-ui/react";

const Users = ({ users }) => {
	return (
		<Box>
			<Heading as="h2">Users</Heading>
			<Table>
				<Thead>
					<Tr>
						<Th>Username</Th>
						<Th>Blogs Created</Th>
					</Tr>
				</Thead>
				<Tbody>
					{users.map(user => (
						<Tr key={user.username}>
							<Td>
								<Link to={`/users/${user.id}`}>{user.name}</Link>
							</Td>
							<td>{user.blogs.length}</td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
};

export default Users;
