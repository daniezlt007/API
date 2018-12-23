/*'use strict';

const restify = require('restify')
const errors = require('restify-errors')
const server = restify.createServer({
    name: 'API',
    version: '1.0.0'
})

var knex = require('knex')({
    client: 'mysql',
    version: '5.7',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '@John0110',
        database : 'projeto'
    }
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.get('/', (req, res, next) => {
    res.send("Minha API 2")
})

server.listen(8000, '127.0.0.1', function () {
    console.log('%s listening at %s', server.name, server.url)
})*/
