import { useEffect, useState } from 'react'
import NoteCard from './NoteCard'
import noteService from '../services/notes'
import { tagFiller } from '../utils/tagFiller'
import tagService from '../services/tags'

const Home = () => {
	const [allNotes, setAllNotes] = useState()
	const [allTags, setAllTags] = useState()
	const [filteredNotes, setFilteredNotes] = useState([])
	const [filters, setFilters] = useState([])
	const [checked, setChecked] = useState()

	useEffect(() => {
		if (!allTags) {
			tagService.getAll().then((res) => {
				setAllTags(res)
				setChecked(res.map((r) => false))
			})
		}

		if (!allNotes && allTags) {
			noteService.getAll().then((res) => {
				tagFiller(res, allTags).then((res) => {
					setAllNotes(res)
				})
			})
		}
		if (allNotes) {
			setFilteredNotes(
				filters.length === 0
					? allNotes
					: allNotes.filter((note) =>
							filters.every((f) =>
								note.tags.map((t) => t.tag_id).includes(f),
							),
					  ),
			)
		}
	}, [allNotes, allTags, filters])

	const handleFilter = (value, i) => {
		setChecked(checked.map((c, pos) => (i === pos ? !c : c)))
		if (!filters.includes(value)) {
			setFilters([...filters, value])
		} else {
			setFilters(filters.filter((f) => f !== value))
		}
	}

	return (
		<div className="Home">
			<h1>My Notes App</h1>
			{allTags ? (
				<div className="filter-select">
					{allTags.map((tag, i) => (
						<span key={tag.tag_id}>
							<input
								type="checkbox"
								id={tag.tag_id}
								name={tag.tag_name}
								value={tag.tag_id}
								checked={checked[i]}
								onChange={() => handleFilter(tag.tag_id, i)}
							/>
							<label htmlFor={tag.tag_id}>{tag.tag_name}</label>
						</span>
					))}
				</div>
			) : (
				<></>
			)}
			{filteredNotes ? (
				filteredNotes.map((note) => (
					<NoteCard key={note.note_id} note={note} />
				))
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}

export default Home
