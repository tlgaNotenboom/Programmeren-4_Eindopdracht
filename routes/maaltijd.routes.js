const routes = require('express').Router()

routes.post('/studentenhuis/:huisId/maaltijd')
routes.get('/studentenhuis/:huisId/maaltijd')
routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId')
routes.put('/studentenhuis/:huisId/maaltijd/:maaltijdId')
routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId')

module.exports = routes