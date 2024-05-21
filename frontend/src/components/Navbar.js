import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
	const user = useSelector((state) => state.user)

	return (
		<div className="navbar">
			<ul>
				<Link to={'/'} className="navbar-item">
					<li>Home</li>
				</Link>
				{user ? (
					<>
						<Link to={'/add'} className="navbar-item">
							<li>Add Note</li>
						</Link>
						<Link
							to={'/logout'}
							className="navbar-item float-right"
						>
							<li>Logout</li>
						</Link>
					</>
				) : (
					<>
						<Link to={'/login'} className="navbar-item float-right">
							<li>Login</li>
						</Link>
					</>
				)}
			</ul>
		</div>
	)
}

export default Navbar
