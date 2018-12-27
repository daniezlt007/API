'use strict';

const userController = require('../controllers/authController')

const routes = (server) => {
    // Principal
    server.get('/', (req, res, next) => {
        res.send({hello: 'Minha API'})
        next()
    })

    // Usuário
    //server.post('/auth', userController.post)
}

module.exports = routes
