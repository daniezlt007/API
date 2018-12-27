'use strict';

const userController = require('../controllers/userController')

const routes = (server) => {
    // Principal
    server.get('/', (req, res, next) => {
        res.send({hello: 'Minha API'})
        next()
    })

    // Usuário
    //server.post('/user', userController.post)
}

module.exports = routes
