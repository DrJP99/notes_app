import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import NoteForm from './components/NoteForm'
import Navbar from './components/Navbar'
import NotePage from './components/NotePage'
import LoginForm from './components/Login'
import Logout from './components/Logout'
import User from './components/User'

const App = () => {
	return (
		<div className="App">
			<Navbar />
			<div className="main">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/note/:id" element={<NotePage />} />
					<Route path="/me" element={<User />} />
					<Route path="/add" element={<NoteForm />} />
					<Route path="/edit/:id" element={<NoteForm />} />
					<Route path="/login" element={<LoginForm />} />
					<Route path="/logout" element={<Logout />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
