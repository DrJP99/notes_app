import { Link } from 'react-router-dom'

const NoteCard = ({ note }) => {
	return (
		<div className="note-card">
			<div className="card-header">
				{note.archived ? (
					<div className="tags">
						<span className="tag tag-archived">ARCHIVED</span>
					</div>
				) : (
					<></>
				)}
				<div className="card-header-top">
					<h3 className="card-title">
						<Link to={`/note/${note.note_id}`}>{note.title}</Link>
					</h3>
					<p className="date">{note.create_dte}</p>
				</div>
				<p className="note-creator">{note.created_by}</p>
			</div>
			<div className="card-body">
				<p className="card-text">{note.body}</p>
			</div>
		</div>
	)
}

export default NoteCard
