'use strict'

// Controllers
const indexController = require('../controllers/indexController')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')

// Middleware
const profile = require('../middleware/profile')

const routes = (server) => {
    // Home
    server.get('/', indexController.welcome)

    // Login
    server.post('/auth', authController.login)

    // User
    server.post('/user', userController.store)
    server.put('/user', userController.edit) // Precisa estar autenticado

    // Product
    server.post('/product', profile.isOwner, productController.store)
}

module.exports = routes
