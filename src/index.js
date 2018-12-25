'use strict';

const server = require('./server')

server.listen(8000, '127.0.0.1', function () {
    console.log('%s listening at %s', server.name, server.url)
})
