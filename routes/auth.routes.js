const routes = require('express').Router()
const ApiError = require('../domain/ApiError')
const authController = require('../controllers/authentication.controller')

routes.post('/login', authController.login)
routes.post('/register', authController.register)

module.exports = routes