'use strict'

// Controllers
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const establishmentController = require('../controllers/establishmentController')
const productController = require('../controllers/productController')

// Middleware
const profile = require('../middleware/profile')

const routes = (server) => {
    // Login
    server.post('/auth', authController.login)

    // User
    server.post('/user', userController.store)
    server.put('/user', profile.isAuthenticate, userController.edit)

    // Establishment
    server.post('/establishment', profile.isOwner, establishmentController.store)

    // Product
    server.post('/product', profile.isOwner, productController.store)
}

module.exports = routes
