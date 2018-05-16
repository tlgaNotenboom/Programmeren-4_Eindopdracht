const routes = require('express').Router()
const deelnemerController = require('../controllers/deelnemer.controller')

routes.post('/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', deelnemerController.addDeelnemer)
routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', deelnemerController.getDeelnemer)
routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', deelnemerController.deleteDeelnemer)

module.exports = routes