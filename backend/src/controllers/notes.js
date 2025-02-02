const notesRouter = require('express').Router()
const db = require('../../utils/db')

// GET all notes or a specific note
notesRouter.get('/', async (req, res) => {
	// doesn't return archived notes
	q = `SELECT n.note_id, 
	n.created_by, 
	n.title, 
	n.body, 
	n.archived, 
	TO_CHAR (n.create_dte, 'HH24:MM - DD/MM/YYYY') as create_dte, 
	array_agg(t.tag_id) as tags
	FROM notes as n
	LEFT JOIN note_tag as nt
		ON n.note_id = nt.note_id
	LEFT JOIN tags as t
		ON t.tag_id = nt.tag_id
	WHERE n.archived = false
	GROUP BY n.note_id
	ORDER BY n.create_dte DESC`

	db.query(q, (error, result) => {
		if (error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

notesRouter.get('/all', async (req, res) => {
	// returns all, including archived
	q = `SELECT n.note_id, 
	n.created_by, 
	n.title, 
	n.body, 
	n.archived, 
	TO_CHAR (n.create_dte, 'HH24:MM - DD/MM/YYYY') as create_dte, 
	array_agg(t.tag_id) as tags
	FROM notes as n
	LEFT JOIN note_tag as nt
		ON n.note_id = nt.note_id
	LEFT JOIN tags as t
		ON t.tag_id = nt.tag_id
	GROUP BY n.note_id
	ORDER BY n.create_dte DESC`

	db.query(q, (error, result) => {
		if (error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

notesRouter.get('/:id', async (req, res) => {
	const id = req.params.id
	const q = `SELECT n.note_id, 
	n.created_by, 
	n.title, 
	n.body, 
	n.archived, 
	TO_CHAR (n.create_dte, 'HH24:MM - DD/MM/YYYY') as create_dte, 
	array_agg(t.tag_id) as tags
	FROM notes as n
	LEFT JOIN note_tag as nt
		ON n.note_id = nt.note_id
	LEFT JOIN tags as t
		ON t.tag_id = nt.tag_id
	WHERE n.note_id = $1
	GROUP BY n.note_id
	ORDER BY n.create_dte DESC`

	db.query(q, [id], (error, result) => {
		if (error) {
			throw error
		}
		if (result.rowCount === 0) {
			res.status(404).end()
		} else {
			res.status(200).json(result.rows)
		}
	})
})

notesRouter.get('/user/:user', async (req, res) => {
	// returns all notes made by a user, including archived notes
	const user = req.params.user
	const q = `SELECT n.note_id, 
	n.created_by, 
	n.title, 
	n.body, 
	n.archived, 
	TO_CHAR (n.create_dte, 'HH24:MM - DD/MM/YYYY') as create_dte, 
	array_agg(t.tag_id) as tags
	FROM notes as n
	LEFT JOIN note_tag as nt
		ON n.note_id = nt.note_id
	LEFT JOIN tags as t
		ON t.tag_id = nt.tag_id
	WHERE n.created_by = $1
	GROUP BY n.note_id
	ORDER BY n.create_dte DESC`

	db.query(q, [user], (error, result) => {
		if (error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

// POST create note
notesRouter.post('/', async (req, res) => {
	const { created_by, title, body } = req.body

	db.query(
		'INSERT INTO notes (created_by, title, body) VALUES ($1, $2, $3) RETURNING *',
		[created_by, title, body],
		(error, result) => {
			if (error) {
				throw error
			}
			res.status(200).json(result.rows)
		},
	)
})

// PUT update note
notesRouter.put('/:id', async (req, res) => {
	const id = req.params.id
	const { title, body } = req.body

	db.query(
		'UPDATE notes SET title = $2, body = $3 WHERE note_id = $1 RETURNING *',
		[id, title, body],
		(error, result) => {
			if (error) {
				throw error
			}
			if (result.rowCount === 0) {
				res.status(404).end()
			}
			res.status(200).json(result.rows)
		},
	)
})

notesRouter.put('/archive/:id', async (req, res) => {
	const id = req.params.id
	db.query(
		'UPDATE notes SET archived = NOT archived WHERE note_id = $1 RETURNING *',
		[id],
		(error, result) => {
			if (error) {
				throw error
			}
			if (result.rowCount === 0) {
				res.status(404).end()
			}
			res.status(200).json(result.rows)
		},
	)
})

// DELETE deletes a note
notesRouter.delete('/:id', async (req, res) => {
	const id = req.params.id

	db.query('DELETE FROM notes WHERE note_id = $1', [id], (error, result) => {
		if (error) {
			throw error
		}
		res.status(200).send(`Note deleted with ID: ${id}`)
	})
})

module.exports = notesRouter
