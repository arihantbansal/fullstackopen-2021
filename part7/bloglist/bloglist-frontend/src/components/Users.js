import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "redux/allUsersReducer";

const Users = () => {
	const dispatch = useDispatch();

	const users = useSelector(state => state.allUsers);

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	return (
		<div>
			<h2>Users</h2>
			{users && (
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
								<td>{user.name}</td>
								<td>{user.blogs.length}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Users;
