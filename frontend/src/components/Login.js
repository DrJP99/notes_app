import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../app/userSlice'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const user = useSelector((state) => state.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const formSubmit = (e) => {
		e.preventDefault()

		// there is no password validation
		console.log(username, password)
		dispatch(setUser(username))
		navigate('/')
	}

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [navigate, user])

	return (
		<div className=" form">
			<form className="form-group" onSubmit={formSubmit}>
				<label htmlFor="user">User</label>
				<input
					type="text"
					value={username}
					id="user"
					name="user"
					onChange={({ target }) => setUsername(target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					value={password}
					id="password"
					name="password"
					onChange={({ target }) => setPassword(target.value)}
				/>
				<div className="form-footer">
					<button
						type="submit"
						className="btn btn-accept float-right"
					>
						Login
					</button>
				</div>
			</form>
		</div>
	)
}

export default LoginForm
