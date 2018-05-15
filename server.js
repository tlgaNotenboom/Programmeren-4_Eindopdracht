const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const auth_routes = require('./routes/auth.routes')
const deelnemer_routes = require('./routes/deelnemer.routes')
const maaltijd_routes = require('./routes/maaltijd.routes')
const studentenhuis_routes = require('./routes/studentenhuis.routes')
const AuthController = require('./controllers/authentication.controller')
const ApiError = require('./domain/ApiError')
const settings = require('./config/config')


const port = process.env.PORT || settings.webPort

let app = express()

app.use(bodyParser.json())

app.use(morgan('dev'))


app.use('*', function(req, res, next){
	next()
})


app.use('/api', auth_routes)

app.all('*', AuthController.validateToken);

app.use('/api', deelnemer_routes)

app.use('/api', maaltijd_routes)

app.use('/api', studentenhuis_routes)

app.use('*', function (req, res, next) {
	console.log('Non-existing endpoint')
	const error = new ApiError("Deze endpoint bestaat niet", 404)
	next(error)
})


app.use((err, req, res, next) => {
	console.dir(err)
	res.status((err.code || 404)).json(err).end()	
})


app.listen(port, () => {
	console.log('Server running on port ' + port)
})

module.exports = app