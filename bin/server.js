'use strict'

const jwt = require('express-jwt')
const cors = require('./cors')
const restify = require('restify')
const app = restify.createServer()
const routes = require('../src/routes/api')

app.use(jwt({ secret: process.env.JWT_SECRET }).unless({
    path: [
        { url: '/auth', method: 'POST' },
        { url: '/user', method: 'POST' }
    ]
}))

// CORS
app.pre(cors.preflight)
app.use(cors.actual)

// Restify
app.use(restify.plugins.acceptParser(app.acceptable))
app.use(restify.plugins.queryParser())
app.use(restify.plugins.bodyParser())

// Carrega todas as rotas
routes(app)

module.exports = app
