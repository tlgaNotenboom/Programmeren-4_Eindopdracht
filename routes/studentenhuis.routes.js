const routes = require('express').Router()
const studentenhuisController = require('../controllers/studentenhuis.controller')

routes.post('/studentenhuis', studentenhuisController.addStudentenhuis)
routes.get('/studentenhuis', studentenhuisController.getStudentenHuis)
routes.get('/studentenhuis/:huisId', studentenhuisController.getSpecificStudentenHuis)
routes.put('/studentenhuis/:huisId', studentenhuisController.updateStudentenHuis)
// routes.delete('/studentenhuis/:huisId')

module.exports = routes
