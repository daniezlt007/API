'use strict';

const app = require('../src/app')

const server = app.createServer({
    name: 'API',
    version: '1.0'
})

server.use(app.plugins.acceptParser(server.acceptable))
server.use(app.plugins.queryParser())
server.use(app.plugins.bodyParser())

server.listen(8000, '127.0.0.1', function () {
    console.log('%s listening at %s', server.name, server.url)
})
