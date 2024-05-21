import { useEffect, useState } from 'react'
import noteService from './services/notes'
import { useParams } from 'react-router-dom'

const NotePage = () => {
	const [note, setNote] = useState()

	const { id } = useParams()

	useEffect(() => {
		noteService
			.getOne(id)
			.then((res) => {
				console.log(res)
				setNote(res)
			})
			.catch((err) => console.error(err.message))
	}, [id])

	return (
		<div>
			{note ? (
				<div>
					<h2>{note.title}</h2>
					<p>{note.created_by}</p>
					<p>{note.body}</p>
					<p>Create on: {note.create_dte}</p>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}

export default NotePage
