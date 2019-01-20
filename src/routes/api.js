'use strict'

// Middleware
const profile = require('../middleware/profile')

// Controllers
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const establishmentController = require('../controllers/establishmentController')
const productController = require('../controllers/productController')

const routes = (server) => {
    // Login
    server.post('/auth', authController.login)

    /*
    *   USUAÁRIO
    */

    server.post('/user', userController.store)
    server.put('/user', profile.isAuthenticate, userController.edit)

    /*
    *   ESTABELECIMENTO
    */

    server.post('/establishment', profile.isOwner, establishmentController.store)
    // Cadastra a foto/logo do Estabelecimento
    server.post('/establishment/photo', profile.isOwner, establishmentController.storePhoto)
    // Deleta a foto/logo do Estabelecimento
    server.del('/establishment/photo', profile.isOwner, establishmentController.deletePhoto)

    /*
    *   PRODUTO
    */

    server.post('/product', profile.isOwner, productController.store)
}

module.exports = routes
