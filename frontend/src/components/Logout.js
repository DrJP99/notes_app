import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearUser } from '../app/userSlice'

const Logout = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(clearUser())
		navigate('/')
	}, [dispatch, navigate])

	return <p>Logging out...</p>
}

export default Logout
