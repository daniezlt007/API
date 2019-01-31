'use strict'

const cors = require('./cors')
const restify = require('restify')
const rjwt = require('restify-jwt-community')
const app = restify.createServer()
const routes = require('../src/routes/api')

const config = require('./config')

// CORS
app.pre(cors.preflight)
app.use(cors.actual)

// Restify
app.use(restify.plugins.acceptParser(app.acceptable))
app.use(restify.plugins.queryParser())
app.use(restify.plugins.bodyParser())

app.use(rjwt(config.jwt).unless({
    path: [
        '/auth', { method: 'POST' },
        '/user', { method: 'POST' }
    ]
}))

// Carrega todas as rotas
routes(app)

module.exports = app
