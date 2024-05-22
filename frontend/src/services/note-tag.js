import axios from 'axios'

const serverUrl = 'http://localhost:3000'
const baseUrl = `${serverUrl}/notetag`

const updateNoteTag = async (note_id, added_tags, removed_tags) => {
	const body = {
		note_id,
		added_tags,
		removed_tags,
	}
	const res = await axios.post(baseUrl, body)
	return res.data
}

const notetagService = {
	updateNoteTag,
}
export default notetagService
