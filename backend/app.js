const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()

const app = express()
const db = require('./utils/db')

app.get('/', (req, res) => {
	res.json({ info: 'Node.js, Express and PostgreSQL API' })
})

app.get('/notes', (req, res) => {
	db.query('SELECT * FROM notes ORDER BY note_id ASC', (error, result) => {
		if (error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

module.exports = app
