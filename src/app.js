'use strict';

const restify = require('restify')
const app = restify.createServer({
    name: 'API',
    version: '1.0'
})

app.use(restify.plugins.acceptParser(app.acceptable))
app.use(restify.plugins.queryParser())
app.use(restify.plugins.bodyParser())

// Não está sendo usado
var knex = require('knex')({
    client: 'mysql',
    version: '5.7',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'projeto'
    }
})

// Carrega as Rotas
const indexRoute = require('./routes/indexRoute')

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

app.use('/', indexRoute)

module.exports = app
