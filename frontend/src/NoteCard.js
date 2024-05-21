const NoteCard = ({ note }) => {
	return (
		<div className="note-card">
			<div className="card-header">
				<h3 className="card-title">{note.title}</h3>
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
