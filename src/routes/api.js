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

    // Acesso APENAS para Owner
    server.post('/establishment', profile.isOwner, establishmentController.store)
    server.post('/establishment/photo', profile.isOwner, establishmentController.storePhoto)
    server.del('/establishment/:id/photo', profile.isOwner, establishmentController.deletePhoto)

    /*
    *   PRODUTO
    */

    // Acesso APENAS para Owner OU Manager
    server.post('/item', [profile.isOwner, profile.isManager], itemController.store)
}

module.exports = routes
