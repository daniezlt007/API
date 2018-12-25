'use strict';

const routes = (server) => {
    server.get('/', (req, res, next) => {
        res.send('Minha API')
        next()
    })
}

module.exports = routes
