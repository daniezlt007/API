'use strict'

const jwt = require('jsonwebtoken')

exports.isOwner = function (req, res, next) {
    const token = req.headers['x-access-token']

    // Esse if não é relevante aqui pois já é verificado pelo authenticate.js em todas as rotas
    //if (!token) return res.json(401, { message: 'Token não fornecido' })
    return jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
        if (error) return res.json(401, { message: 'Token inválido' })

        if (decoded.profile != 'owner') return res.json(403, { message: 'Restrito à Owners' })
        next()
    })
}
