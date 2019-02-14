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
    app.put('/user', profile.isAuthenticate(), userController.edit)

    /*
    *   ESTABELECIMENTO
    */

    // Acesso APENAS para Subscriber
    app.post('/establishment', profile.isAuthenticate(), establishmentController.store)
    app.post('/establishment/photo', profile.isAuthenticate(), establishmentController.storePhoto)
    app.del('/establishment/:id/photo', profile.isAuthenticate(), establishmentController.deletePhoto)

    /*
    *   PRODUTO
    */

    //app.get('/item/:id', profile.isAuthenticate(), itemController.all)

    // Acesso APENAS para Owner ou Manager
    app.post('/item', profile.isAuthenticate(), itemController.store)
    /*app.post('/item/:id/photo', profile.isAuthenticate(), itemController.storePhoto)
    app.put('/item/:id', profile.isAuthenticate(), itemController.editItem)
    app.del('/item/:id', profile.isAuthenticate(), itemController.deleteItem)
    app.del('/item/:id/photo/:id', profile.isAuthenticate(), itemController.deletePhoto)*/

    /*
    *   GERENTE
    */

    // Acesso APENAS para Owner
    /*app.post('/manager', profile.isAuthenticate(), managerController.store)
    app.del('/manager/:id', profile.isAuthenticate(), managerController.deleteManager)*/

    /*
    *   ATENDENTE
    */

    // Acesso APENAS para Owner ou Manager
    /*app.post('/attendant', profile.isAuthenticate(), attendantController.store)
    app.del('/attendant/:id', profile.isAuthenticate(), attendantController.deleteAttendant)*/
}

module.exports = routes
