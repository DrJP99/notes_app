import { useEffect } from 'react'
import NoteCard from './NoteCard'
import noteService from './services/notes'

const Home = () => {
	useEffect(() => {
		noteService.getAll().then((res) => {
			console.log(res)
		})
	}, [])

	return (
		<div className="Home">
			<h1>My Notes App</h1>
			<NoteCard />
			<NoteCard />
			<NoteCard />
		</div>
	)
}

export default Home
