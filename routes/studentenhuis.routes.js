const routes = require('express').Router()

routes.post('/studentenhuis')
routes.get('/studentenhuis')
routes.get('/studentenhuis/:huisId')
routes.put('/studentenhuis/:huisId')
routes.delete('/studentenhuis/:huisId')

module.exports = routes
