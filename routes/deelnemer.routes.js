const routes = require('express').Router()

routes.post('/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers')
routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers')
routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers')

module.exports = routes