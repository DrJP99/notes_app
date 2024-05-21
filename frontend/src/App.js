import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home'
import NoteForm from './NoteForm'
import Navbar from './Navbar'
import NotePage from './NotePage'

const App = () => {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/note/:id" element={<NotePage />} />
				<Route path="/add" element={<NoteForm />} />
				<Route path="/edit/:id" element={<NoteForm />} />
			</Routes>
		</div>
	)
}

export default App
