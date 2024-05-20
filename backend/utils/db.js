const { Pool } = require('pg')

const db = new Pool({
	host: 'localhost',
	port: '5432',
	database: 'notes',
	user: 'postgres',
	password: 'postgres',
})

module.exports = db
