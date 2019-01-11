'use strict'

const indexController = require('../controllers/indexController')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const routes = (server) => {
    // Home
    server.get('/', indexController.welcome)

    // Cadastro
    server.post('/register', userController.register)

    // Login
    server.post('/login', authController.login)
}

module.exports = routes
