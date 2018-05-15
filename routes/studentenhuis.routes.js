const routes = require('express').Router()
const studentenhuisController = require('../controllers/studentenhuis.controller')

routes.post('/studentenhuis', studentenhuisController.addStudentenhuis)
routes.get('/studentenhuis')
routes.get('/studentenhuis/:huisId')
routes.put('/studentenhuis/:huisId')
routes.delete('/studentenhuis/:huisId')

module.exports = routes
