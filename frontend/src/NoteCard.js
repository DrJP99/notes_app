const NoteCard = () => {
	return (
		<div className="note-card">
			<div className="card-header">
				<h3 className="card-title">Title</h3>
				<p className="date">20/05/2024</p>
				<p className="note-creator">JP</p>
			</div>
			<div className="card-body">
				<p className="card-text">This is a card body</p>
			</div>
		</div>
	)
}

export default NoteCard
