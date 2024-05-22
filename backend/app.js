const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()

const middleware = require('./utils/middleware')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
	cors({
		origin: '*',
		credentials: true,
	}),
)

app.use(middleware.requestLogger)

app.get('/', (req, res) => {
	res.json({ info: 'Node.js, Express and PostgreSQL API' })
})

const notesRouter = require('./src/controllers/notes')
const tagsRouter = require('./src/controllers/tags')
app.use('/notes', notesRouter)
app.use('/tags', tagsRouter)

module.exports = app
