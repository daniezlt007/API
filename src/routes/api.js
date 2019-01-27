'use strict'

// Middleware
const profile = require('../middleware/profile')

// Controllers
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const establishmentController = require('../controllers/establishmentController')
const itemController = require('../controllers/itemController')

const routes = (server) => {
    /*
    *   LOGIN
    */

    server.post('/auth', authController.login)

    /*
    *   USUÁRIO
    */

    server.post('/user', userController.store)
    server.put('/user', profile.isAuthenticate, userController.edit)

    /*
    *   ESTABELECIMENTO
    */

    server.post('/establishment', profile.isOwner, establishmentController.store)
    // Cadastra o logotipo
    server.post('/establishment/photo', profile.isOwner, establishmentController.storePhoto)
    // Deleta o logotipo
    server.del('/establishment/:id/photo', profile.isOwner, establishmentController.deletePhoto)

    /*
    *   PRODUTO
    */

    // Precisa ser Owner OU Manager
    server.post('/item', [profile.isOwner, profile.isManager], itemController.store)
}

module.exports = routes
