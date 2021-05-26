import React, { useState } from 'react'

const AddUserForm = props => {
	const initialFormState = { first_name: '', last_name: '', email: '' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()

				props.addUser(user)

				setUser(initialFormState)
			}}
		>
			<label>first name</label>
			<input type="text" name="first_name" required value={user.first_name} onChange={handleInputChange} />
			<label>last name</label>
			<input type="text" name="last_name" required value={user.last_name} onChange={handleInputChange} />
      <label>email</label>
			<input type="text" name="email" required value={user.email} onChange={handleInputChange} />
			<button>Add new user</button>
		</form>
	)
}

export default AddUserForm;
