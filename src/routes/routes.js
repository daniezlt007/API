'use strict'

const indexController = require('../controllers/indexController')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')

const routes = (server) => {
    // Home
    server.get('/', indexController.welcome)

    // Cadastro
    server.post('/user', userController.store)

    // Login
    server.post('/auth', authController.login)

    // TESTAR MIDDLEWARE (NÍVEL DE ACESSO)
    //server.post('/product', productController.store)
}

module.exports = routes
