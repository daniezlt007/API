'use strict'

// Middleware
const profile = require('../middleware/profile')

// Controllers
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const establishmentController = require('../controllers/establishmentController')
const itemController = require('../controllers/itemController')

const routes = (app) => {
    /*
    *   LOGIN
    */

    app.post('/auth', authController.login)

    /*
    *   USUÁRIO
    */

    app.post('/user', userController.store)
    app.put('/user', userController.edit)

    /*
    *   ESTABELECIMENTO
    */

    // Acesso APENAS para Owner
    app.post('/establishment', profile.access('owner'), establishmentController.store)
    app.post('/establishment/photo', profile.access('owner'), establishmentController.storePhoto)
    app.del('/establishment/:id/photo', profile.access('owner'), establishmentController.deletePhoto)

    /*
    *   PRODUTO
    */

    // Acesso APENAS para Owner ou Manager
    app.post('/item', profile.access('owner', 'manager'), itemController.store)
}

module.exports = routes
