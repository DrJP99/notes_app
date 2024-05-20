const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()

const middleware = require('./utils/middleware')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const db = require('./utils/db')

app.use(
	cors({
		origin: '*',
		credentials: true,
	}),
)

// app.use((req, res) => {
// 	const allowedDomains = ['http://localhost:8000']
// 	const origin = req.headers.origin
// 	console.log(origin)
// 	if (allowedDomains.indexOf(origin) > -1) {
// 		res.header('Access-Control-Allow-Origin', origin)
// 	}
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept',
// 	)
// })

app.use(middleware.requestLogger)

app.get('/', (req, res) => {
	res.json({ info: 'Node.js, Express and PostgreSQL API' })
})

const notesRouter = require('./src/controllers/notes')
app.use('/notes', notesRouter)

// app.get('/notes', (req, res) => {
// 	db.query('SELECT * FROM notes ORDER BY note_id ASC', (error, result) => {
// 		if (error) {
// 			throw error
// 		}
// 		res.status(200).json(result.rows)
// 	})
// })

module.exports = app
