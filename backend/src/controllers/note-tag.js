const notetagRouter = require('express').Router()
const db = require('../../utils/db')

// POST
notetagRouter.post('/', async (req, res) => {
	const { note_id, added_tags, removed_tags } = req.body

	qAdd = `INSERT INTO note_tag (note_id, tag_id)
		VALUES ($1, $2)`

	qRemove = `DELETE FROM note_tag
		WHERE note_id = $1
			and tag_id = $2`

	added_tags.forEach((tag) => {
		db.query(qAdd, [note_id, tag], (error, _) => {
			if (error) throw error
		})
	})

	removed_tags.forEach((tag) => {
		db.query(qRemove, [note_id, tag], (error, _) => {
			if (error) throw error
		})
	})

	res.status(200).send("Note's tags updated")
})

module.exports = notetagRouter
