import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import axios from "axios";

const baseUrl = "http://localhost:8000/users";

function App() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios.get(baseUrl)
			.then((res) => {
				setUsers(res.data);
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
	}, []);

	const addUser = (user) => {
		const id = users.length + 1;
		setUsers([...users, { id, ...user }]);
	};

	const editUser = (updatedUser) => {
		setUsers(
			users.map((user) =>
				user.id === updatedUser.id ? { ...user, ...updatedUser } : user
			)
		);
	};

	const deleteUser = (id) => {
		setUsers(users.filter((el) => el.id !== id));
	};

	return (
		<div>
			<Header title="The header" name="" />
			{/* <main>
        <Users users={users} onEdit={editUser} onDelete={deleteUser} />
      </main>
      <aside>
        <AddUser onAdd={addUser} buttonName="Add" />
      </aside> */}
		</div>
	);
}

export default App;
