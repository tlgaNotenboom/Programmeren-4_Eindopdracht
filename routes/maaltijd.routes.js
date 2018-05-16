const routes = require('express').Router()
const maaltijdController = require('../controllers/maaltijd.controller')

routes.post('/studentenhuis/:huisId/maaltijd',maaltijdController.addMaaltijd)
routes.get('/studentenhuis/:huisId/maaltijd', maaltijdController.getMaaltijd)
routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId', maaltijdController.getSpecificMaaltijd)
routes.put('/studentenhuis/:huisId/maaltijd/:maaltijdId', maaltijdController.updateMaaltijd)
routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId', maaltijdController.deleteMaaltijd)

module.exports = routes