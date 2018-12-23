'use strict';

const router = require('restify')

// Não está sendo usado
const errors = require('restify-errors')

router.get('/', (req, res, next) => {
    res.send('Minha API')
})

module.exports = router
