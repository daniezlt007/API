'use strict';

const authController = require('../controllers/authController')

const routes = (server) => {
    // Principal
    server.get('/', (req, res, next) => {
        res.send({ hello: "Minha API" })
        next()
    })

    // Autenticação
    server.get('/login', authController.login)
    server.post('/register', authController.register)
    server.put('/refresh', authController.refresh)
}

module.exports = routes
