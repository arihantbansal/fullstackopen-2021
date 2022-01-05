import React from "react";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
	console.log("users", users);
	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th>Username</th>
						<th>Blogs Created</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.username}>
							<td>
								<Link to={`/users/${user.id}`}>{user.name}</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
