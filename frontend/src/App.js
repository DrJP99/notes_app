import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home'
import NoteForm from './NoteForm'
import Navbar from './Navbar'

const App = () => {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/add" element={<NoteForm />} />
				<Route path="/edit/:id" element={<NoteForm />} />
			</Routes>
		</div>
	)
}

export default App
