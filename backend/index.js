const app = require('./app')
const config = require('./utils/config')

const HOST = config.SERVER_HOST
const PORT = config.SERVER_PORT

app.listen(PORT, HOST, () => {
	console.log(`Server running at http://${HOST}:${PORT}/`)
})
