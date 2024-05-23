import { useEffect, useState } from 'react'
import noteService from '../services/notes'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import tagService from '../services/tags'
import notetagService from '../services/note-tag'

const NoteForm = () => {
	const user = useSelector((state) => state.user)
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [creator, setCreator] = useState('')

	const [tags, setTags] = useState([]) // selected tags
	const [selectedTags, setSelectedTags] = useState([]) // equal to above, but stores object
	const [allTags, setAllTags] = useState() // all possible tags
	const [filteredTags, setFilteredTags] = useState([]) // tags not selected

	const { id } = useParams()
	const edit = id ? true : false
	const navigate = useNavigate()

	const formSubmit = async (e) => {
		e.preventDefault()

		const newNote = {
			created_by: user,
			title: title,
			body: body,
		}

		const newTags = selectedTags.map((tag) => tag.tag_id)
		console.log(newTags)
		const addedTags = newTags.filter((t) => !tags.includes(t))
		const removedTags = tags.filter((t) => !newTags.includes(t))

		console.log(tags, newTags, addedTags, removedTags)

		if (body.length > 280) {
			console.error(
				'Body length must be less than or equal to 280 characters',
			)
			return
		}

		if (edit) {
			noteService
				.editNote(id, newNote)
				.then((res) => {
					notetagService
						.updateNoteTag(res.note_id, addedTags, removedTags)
						.then((res) => {
							navigate(`/note/${res.note_id}`)
						})
				})
				.catch((err) => console.error(err.message))
		} else {
			noteService
				.createNote(newNote)
				.then((res) => {
					notetagService
						.updateNoteTag(res.note_id, addedTags, removedTags)
						.then((res) => {
							navigate(`/note/${res.note_id}`)
						})
				})
				.catch((err) => console.error(err.message))
		}
	}

	const tagIdToObject = (tag_id) => {
		const tagIndex = allTags.findIndex((tag) => tag.tag_id === tag_id)
		return { ...allTags[tagIndex] }
	}

	useEffect(() => {
		if (edit && id) {
			noteService
				.getOne(id)
				.then((res) => {
					setTitle(res.title)
					setBody(res.body)
					setCreator(res.created_by)
					setTags(res.tags)
				})
				.catch((err) => console.error(err.message))
		}
		if (edit && ((creator && creator !== user) || !user)) {
			navigate('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creator, edit, id, navigate, user])

	useEffect(() => {
		tagService.getAll().then((res) => setAllTags(res))
	}, [])

	useEffect(() => {
		if (allTags && tags) {
			setSelectedTags(tags.map((tag) => tagIdToObject(tag)))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allTags, tags])

	useEffect(() => {
		if (allTags) {
			setFilteredTags(allTags.filter((tag) => !tags.includes(tag.tag_id)))
		}
	}, [allTags, tags])

	const onAddTag = (tag) => {
		setSelectedTags([...selectedTags, tag])
		setFilteredTags(filteredTags.filter((t) => tag.tag_id !== t.tag_id))
	}

	const onRemoveTag = (tag) => {
		setSelectedTags(selectedTags.filter((t) => tag.tag_id !== t.tag_id))
		setFilteredTags([...filteredTags, tag])
	}

	return (
		<div className="form">
			<form className="form-group" onSubmit={formSubmit}>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					value={title}
					id="title"
					name="title"
					onChange={({ target }) => setTitle(target.value)}
				/>
				<label htmlFor="body">Body</label>
				<textarea
					name="body"
					id="body"
					cols="30"
					rows="5"
					value={body}
					onChange={({ target }) => setBody(target.value)}
				/>
				<h4>Tags:</h4>
				<p>Click a tag to add or remove</p>
				<div className="tags tags-selector tags-selector-selected">
					{selectedTags.map((tag) => (
						<span
							className={`tag tag-${tag.color}`}
							onClick={(_) => onRemoveTag(tag)}
						>
							{tag.tag_name}
						</span>
					))}
				</div>
				<br></br>
				<div className="tags tags-selector tags-selector-avail">
					{filteredTags.map((tag) => (
						<span
							className={`tag tag-${tag.color}`}
							onClick={(_) => onAddTag(tag)}
						>
							{tag.tag_name}
						</span>
					))}
				</div>
				<div className="form-footer">
					<button
						type="submit"
						className="btn btn-accept float-right"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	)
}

export default NoteForm
