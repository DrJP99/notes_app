import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import noteService from '../services/notes'
import NoteCard from './NoteCard'

const User = () => {
	const user = useSelector((state) => state.user)
	const [notes, setNotes] = useState([])

	useEffect(() => {
		noteService
			.getUserNotes(user)
			.then((res) => setNotes(res))
			.catch((err) => console.error(err.message))
	}, [user])

	return (
		<div>
			<h1>{user}</h1>
			{notes ? (
				notes.map((note) => <NoteCard key={note.note_id} note={note} />)
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}

export default User
