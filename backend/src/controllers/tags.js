const tagsRouter = require('express').Router()
const db = require('../../utils/db')

// GET
tagsRouter.get('/', async (req, res) => {
	// Gets all tags
	q = `SELECT * FROM tags`

	db.query(q, (error, result) => {
		if (error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

tagsRouter.get('/:id', async (req, res) => {
	// Gets specified tag
	const id = req.params.id
	const q = `SELECT * FROM tags WHERE tag_id = $1`

	db.query(q, [id], (error, result) => {
		if (error) {
			throw error
		} else {
			res.status(200).json(result.rows)
		}
	})
})

module.exports = tagsRouter
