import { useEffect, useState } from 'react'
import noteService from '../services/notes'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NotePage = () => {
	const [note, setNote] = useState()

	const user = useSelector((state) => state.user)
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		noteService
			.getOne(id)
			.then((res) => {
				setNote(res)
			})
			.catch((err) => console.error(err.message))
	}, [id])

	const onDelete = (e) => {
		e.preventDefault()

		noteService
			.deleteNote(id)
			.then((res) => navigate('/'))
			.catch((err) => console.error(err.message))
	}

	const onEdit = (e) => {
		e.preventDefault()

		navigate(`/edit/${id}`)
	}

	const onArchive = (e) => {
		e.preventDefault()
		console.log('Archive...')
	}

	return (
		<div>
			{note ? (
				<div>
					<h2>{note.title}</h2>
					<p>{note.created_by}</p>
					<p>{note.body}</p>
					<p>Create on: {note.create_dte}</p>
					{user === note.created_by ? (
						<div>
							<button
								className="btn btn-danger"
								onClick={onDelete}
							>
								Delete
							</button>
							<button className="btn btn-accept" onClick={onEdit}>
								Edit
							</button>
							<button
								className="btn btn-warning"
								onClick={onArchive}
							>
								Archive
							</button>
						</div>
					) : (
						<></>
					)}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}

export default NotePage
