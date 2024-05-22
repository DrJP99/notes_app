import { useEffect, useState } from 'react'
import NoteCard from './NoteCard'
import noteService from '../services/notes'
import { tagFiller } from '../utils/tagFiller'

const Home = () => {
	const [allNotes, setAllNotes] = useState([])

	useEffect(() => {
		noteService.getAll().then((res) => {
			// console.log(tagFiller(res))
			tagFiller(res).then((res) => {
				console.log(res)
				setAllNotes(res)
			})
		})
	}, [])

	return (
		<div className="Home">
			<h1>My Notes App</h1>
			{allNotes ? (
				allNotes.map((note) => (
					<NoteCard key={note.note_id} note={note} />
				))
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}

export default Home
