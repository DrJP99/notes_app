import { useEffect, useState } from 'react'
import noteService from '../services/notes'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const NoteForm = () => {
	const user = useSelector((state) => state.user)
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [creator, setCreator] = useState('')

	const { id } = useParams()
	const edit = id ? true : false
	const navigate = useNavigate()

	const formSubmit = async (e) => {
		e.preventDefault()

		const newNote = {
			created_by: user,
			title: title,
			body: body,
		}

		console.log(body.length)

		if (body.length > 280) {
			console.error(
				'Body length must be less than or equal to 280 characters',
			)
			return
		}

		if (edit) {
			noteService
				.editNote(id, newNote)
				.then((res) => {
					navigate(`/note/${res.note_id}`)
				})
				.catch((err) => console.error(err.message))
		} else {
			noteService
				.createNote(newNote)
				.then((res) => {
					navigate(`/note/${res.note_id}`)
				})
				.catch((err) => console.error(err.message))
		}
	}

	useEffect(() => {
		if (edit && id) {
			noteService
				.getOne(id)
				.then((res) => {
					setTitle(res.title)
					setBody(res.body)
					setCreator(res.created_by)
				})
				.catch((err) => console.error(err.message))
		}
		if (edit && ((creator && creator !== user) || !user)) {
			navigate('/')
		}
	}, [creator, edit, id, navigate, user])

	return (
		<div className="form">
			<form className="form-group" onSubmit={formSubmit}>
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
