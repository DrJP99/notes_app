import { useEffect, useState } from 'react'
import noteService from '../services/notes'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { tagFiller } from '../utils/tagFiller'

const NotePage = () => {
	const [note, setNote] = useState()

	const user = useSelector((state) => state.user)
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		noteService
			.getOne(id)
			.then((res) => tagFiller(res))
			.then((res) => {
				setNote(res)
			})
			.catch((err) => console.error(err.message))
	}, [id])

	const onDelete = (e) => {
		e.preventDefault()

		noteService
			.deleteNote(id)
			.then((res) => navigate('/'))
			.catch((err) => console.error(err.message))
	}

	const onEdit = (e) => {
		e.preventDefault()

		navigate(`/edit/${id}`)
	}

	const onArchive = (e) => {
		e.preventDefault()
		noteService
			.archiveNote(id)
			.then((res) => setNote(res))
			.catch((err) => console.error(err.message))
	}

	return (
		<>
			<div className="note">
				{note ? (
					<div>
						<div className="note-header">
							<h2>{note.title}</h2>

							<p className="note-creator">{note.created_by}</p>
						</div>
						<p className="note-body">{note.body}</p>
						<p className="note-date">{note.create_dte}</p>
						{note.archived || note.tags ? (
							<div className="tags">
								{note.archived ? (
									<span className="tag tag-archived">
										ARCHIVED
									</span>
								) : (
									<></>
								)}
								{note.tags.map((tag) => {
									return (
										<span
											className={`tag tag-${tag.color}`}
											key={tag.tag_id}
										>
											{tag.tag_name}
										</span>
									)
								})}
							</div>
						) : (
							<></>
						)}
						{user === note.created_by ? (
							<div className="note-buttons">
								<button
									className="btn btn-danger"
									onClick={onDelete}
								>
									Delete
								</button>
								<button
									className="btn btn-accept"
									onClick={onEdit}
								>
									Edit
								</button>
								<button
									className="btn btn-warning"
									onClick={onArchive}
								>
									{note.archived ? 'Una' : 'A'}rchive
								</button>
							</div>
						) : (
							<></>
						)}
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
			<button
				className="btn btn-gray btn-goback"
				onClick={() => navigate(-1)}
			>
				Go Back
			</button>
		</>
	)
}

export default NotePage
