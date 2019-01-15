'use strict'

// Controllers
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')

// Middleware
const profile = require('../middleware/profile')

const routes = (server) => {
    // Login
    server.post('/auth', authController.login)

    // User
    server.post('/user', userController.store)
    server.put('/user', userController.edit) // Problema: precisa estar autenticado

    // Product
    server.post('/product', profile.isOwner, productController.store)
}

module.exports = routes
