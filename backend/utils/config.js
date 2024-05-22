const dotenv = require('dotenv').config()

const SERVER_HOST = process.env.SERVER_HOST
const SERVER_PORT = process.env.SERVER_PORT

const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_DATABASE = process.env.DB_DATABASE
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

module.exports = {
	SERVER_HOST,
	SERVER_PORT,
	DB_HOST,
	DB_PORT,
	DB_DATABASE,
	DB_USER,
	DB_PASSWORD,
}
