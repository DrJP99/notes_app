import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<div className="navbar">
			<ul>
				<Link to={'/'} className="navbar-item">
					<li>Home</li>
				</Link>
				<Link to={'/add'} className="navbar-item">
					<li>Add Note</li>
				</Link>
			</ul>
		</div>
	)
}

export default Navbar
