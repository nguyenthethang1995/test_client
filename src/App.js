import React, { useState, Fragment, useEffect } from 'react';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import UserTable from './tables/UserTable';
import axios from 'axios';

const App = () => {
	const [ users, setUsers ] = useState([])
	const [ logError, setLogError ] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:3000/api/v1/users')
      .then(res => {
        if (res.status === 200) {
					setUsers(res.data.users)
				}
      })
	}, []);

	const initialFormState = { id: null, first_name: '', last_name: '', email: '' }

	// Setting state
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addUser = user => {
		setLogError([]);
		axios.post('http://localhost:3000/api/v1/users', { user })
			.then(res => {
				if (res.data.success) {
					setUsers([ ...users, res.data.user ])
				}
				else {
					setLogError(res.data.errors)
				}
			})
			.catch(err => {
				console.log(err);
			})
	}

	const deleteUser = id => {
		setLogError([]);
		setEditing(false);
		axios.delete(`http://localhost:3000/api/v1/users/${id}`)
			.then(res => {
				if (res.data.success) {
					setUsers(users.filter(user => user.id !== id))
				}
			})
			.catch(err => {
				console.log(err);
			})
	};

	const updateUser = (id, updatedUser) => {
		setLogError([]);
		setEditing(false);
		axios.put(`http://localhost:3000/api/v1/users/${id}`, { user: updatedUser })
		.then(res => {
			if (res.data.success) {
				setUsers(users.map(user => (user.id === id ? updatedUser : user)))
			} else {
				setLogError(res.data.errors)
			}
		})
		.catch(err => {
			console.log(err);
		})
	}

	const editRow = user => {
		setLogError([]);
		setEditing(true);

		setCurrentUser({ id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email })
	}

	return (
		<div className="container">
			<div className="flex-row">
				<div className="flex-large">
					<p className="log-error">{logError}</p>
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

export default App
