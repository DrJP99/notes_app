const app = require('./app')
const PORT = 3000
const HOST = 'localhost'

app.listen(PORT, HOST, () => {
	console.log(`Server running at http://${HOST}:${PORT}/`)
})
