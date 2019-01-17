'use strict'

const cors = require('./cors')
const restify = require('restify')
const server = restify.createServer()
const routes = require('../src/routes/api')

// CORS
server.pre(cors.preflight)
server.use(cors.actual)

// Restify
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

// Carrega todas as rotas
routes(server)

module.exports = server
