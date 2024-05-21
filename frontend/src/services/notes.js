import axios from 'axios'

const serverUrl = 'http://localhost:3000'
const baseUrl = `${serverUrl}/notes`

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

const createNote = async (note) => {
	const res = await axios.post(baseUrl, note)
	return res.data[0]
}

const editNote = async (id, note) => {
	const res = await axios.put(`${baseUrl}/${id}`, note)
	return res.data[0]
}

const deleteNote = async (id) => {
	const res = await axios.delete(`${baseUrl}/${id}`)
	return res.data
}

const noteService = { getAll, getOne, createNote, editNote, deleteNote }
export default noteService
