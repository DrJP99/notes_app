import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import noteService from '../services/notes'
import NoteCard from './NoteCard'
import { tagFiller } from '../utils/tagFiller'
import tagService from '../services/tags'

const User = () => {
	const user = useSelector((state) => state.user)
	const [hide, setHide] = useState(true) // hides archived notes
	const [allNotes, setAllNotes] = useState()

	const [allTags, setAllTags] = useState()
	const [filteredNotes, setFilteredNotes] = useState()
	const [filters, setFilters] = useState([])
	const [checked, setChecked] = useState()

	const [archIndex, setArchIndex] = useState(0)

	useEffect(() => {
		if (!allTags) {
			tagService.getAll().then((res) => {
				setAllTags([...res])
				const newArr = [...res.map((r) => false), false]
				setArchIndex(newArr.length - 1)
				setChecked(newArr)
			})
		}

		if (!allNotes && allTags) {
			noteService
				.getUserNotes(user)
				.then((res) => tagFiller(res, allTags))
				.then((res) =>
					setAllNotes(
						res.map((r) =>
							r.archived
								? {
										...r,
										tags: [
											...r.tags,
											{
												tag_id: 'arch',
												tag_name: 'ARCHIVED',
												color: 'archived',
											},
										],
								  }
								: r,
						),
					),
				)
				.catch((err) => console.error(err.message))
		}

		if (allNotes && !filteredNotes) {
			setFilteredNotes(allNotes)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allNotes, allTags, filteredNotes, filters, user])

	useEffect(() => {
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
	}, [allNotes, filters])

	const handleFilter = (value, i) => {
		setChecked(checked.map((c, pos) => (i === pos ? !c : c)))
		if (!filters.includes(value)) {
			setFilters([...filters, value])
		} else {
			setFilters(filters.filter((f) => f !== value))
		}
	}

	return (
		<div>
			<h1>{user}</h1>
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
					<span style={{ display: hide ? 'none' : 'inline' }}>
						<input
							type="checkbox"
							id="arch"
							name="arch"
							value="arch"
							checked={checked[archIndex]}
							onChange={() => handleFilter('arch', archIndex)}
						/>
						<label htmlFor="arch">archived</label>
					</span>
				</div>
			) : (
				<></>
			)}
			<button
				className={`btn btn-${hide ? 'good' : 'warning'}`}
				onClick={(_) => {
					setHide(!hide)
					setFilters(filters.filter((f) => f !== 'arch'))
					if (checked[archIndex] && hide) {
						setFilters([...filters, 'arch'])
					}
				}}
			>
				{hide ? 'Show' : 'Hide'} Archived Notes
			</button>
			{filteredNotes ? (
				filteredNotes.map((note) =>
					note.archived && hide ? (
						<></>
					) : (
						<NoteCard key={note.note_id} note={note} />
					),
				)
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}

export default User
