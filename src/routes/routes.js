'use strict'

const indexController = require('../controllers/indexController')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
//const productController = require('../controllers/productController')

// Middleware
const clientMiddleware = require('../middleware/clientMiddleware')
const attendantMiddleware = require('../middleware/attendantMiddleware')
const ownerMiddleware = require('../middleware/ownerMiddleware')

const routes = (server) => {
    // Home
    server.get('/', indexController.welcome)

    // Login
    server.post('/auth', authController.login)

    // User
    server.post('/user', userController.store)
    server.put('/user', userController.edit)

    // TESTAR MIDDLEWARE (NÍVEL DE ACESSO: owner)
    //server.post('/product', productController.store)
}

module.exports = routes
