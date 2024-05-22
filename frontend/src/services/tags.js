import axios from 'axios'

const serverUrl = 'http://localhost:3000'
const baseUrl = `${serverUrl}/tags`

const getAll = async () => {
	const req = axios.get(baseUrl)
	const res = await req
	return res.data
}

const getOne = async (id) => {
	const req = axios.get(`${baseUrl}/${id}`)
	const res = await req
	return res.data[0]
}

const tagService = {
	getAll,
	getOne,
}
export default tagService
