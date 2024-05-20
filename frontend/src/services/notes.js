import axios from 'axios'

const serverUrl = 'http://localhost:3000'
const baseUrl = `${serverUrl}/notes`

const getAll = async () => {
	const req = axios.get(baseUrl)
	const res = await req
	return res.data
}

const noteService = { getAll }
export default noteService
