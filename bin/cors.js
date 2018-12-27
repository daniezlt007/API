'use strict';

const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
    preflightMaxAge: 5, // Opcional
    origins: ['*'],
    allowHeaders: ['Origin, X-Requested-With, Content-Type, Accept, x-access-token'],
    exposeHeaders: ['GET, POST, PUT, DELETE, OPTIONS']
})

module.exports = cors
