'use strict'

const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const routes = (server) => {
    // Principal
    server.get('/', (req, res, next) => {
        res.send({ hello: 'API' })
        next()
    })

    // Cadastro
    server.post('/register', userController.register)

    // Autenticação
    server.post('/login', authController.login)
}

module.exports = routes
