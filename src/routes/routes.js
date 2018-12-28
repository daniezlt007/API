'use strict';

const authController = require('../controllers/authController')

const routes = (server) => {
    // Principal
    server.get('/', (req, res, next) => {
        res.send({hello: 'Minha API'})
        next()
    })

    // Autenticação
    server.post('/login', authController.post)
}

module.exports = routes
