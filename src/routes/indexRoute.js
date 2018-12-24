'use strict';

const route = require('restify')

route.get('/', (req, res, next) => {
    res.send('Minha API')
})

module.exports = route
