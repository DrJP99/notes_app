import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import noteService from '../services/notes'
import NoteCard from './NoteCard'

const User = () => {
	const user = useSelector((state) => state.user)
	const [hide, setHide] = useState(true) // hides archived notes
	const [allNotes, setAllNotes] = useState([])
	const [notes, setNotes] = useState([]) // filtered notes

	useEffect(() => {
		noteService
			.getUserNotes(user)
			.then((res) => setAllNotes(res))
			.catch((err) => console.error(err.message))
	}, [user])

	useEffect(() => {
		if (hide) {
			setNotes(allNotes.filter((note) => note.archived === false))
		} else {
			setNotes(allNotes)
		}
	}, [hide, allNotes])

	return (
		<div>
			<h1>{user}</h1>
			<button
				className={`btn btn-${hide ? 'good' : 'warning'}`}
				onClick={(_) => setHide(!hide)}
			>
				{hide ? 'See' : 'Hide'} Archived Notes
			</button>
			{notes ? (
				notes.map((note) => <NoteCard key={note.note_id} note={note} />)
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}

export default User
