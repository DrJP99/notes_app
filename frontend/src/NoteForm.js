import { useState } from 'react'

const NoteForm = () => {
	const [user, setUser] = useState('')
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')

	const edit = false

	const formSubmit = async (e) => {
		e.preventDefault()

		console.log('helllo')
	}

	return (
		<div className="form">
			<form className="form-group" onSubmit={formSubmit}>
				<label htmlFor="user">User</label>
				<input
					type="user"
					value={user}
					id="user"
					name="user"
					onChange={({ target }) => setUser(target.value)}
				/>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					value={title}
					id="title"
					name="title"
					onChange={({ target }) => setTitle(target.value)}
				/>
				<label htmlFor="body">Body</label>
				<textarea
					name="body"
					id="body"
					cols="30"
					rows="5"
					value={body}
					onChange={({ target }) => setBody(target.value)}
				/>
				<div className="form-footer">
					<button
						type="submit"
						className="btn btn-accept float-right"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	)
}

export default NoteForm
