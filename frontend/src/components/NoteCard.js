import { Link } from 'react-router-dom'

const NoteCard = ({ note }) => {
	return (
		<div className="note-card">
			<div className="card-header">
				<Link to={`/note/${note.note_id}`}>
					<h3 className="card-title">{note.title}</h3>
				</Link>
				<p className="date">{note.create_dte}</p>
				<p className="note-creator">{note.created_by}</p>
			</div>
			<div className="card-body">
				<p className="card-text">{note.body}</p>
			</div>
		</div>
	)
}

export default NoteCard
