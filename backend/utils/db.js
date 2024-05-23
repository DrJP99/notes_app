const { Pool } = require('pg')
const config = require('./config')

const db = new Pool({
	host: config.DB_HOST,
	port: config.DB_PORT,
	database: config.DB_DATABASE,
	user: config.DB_USER,
	password: config.DB_PASSWORD,
})

module.exports = db
