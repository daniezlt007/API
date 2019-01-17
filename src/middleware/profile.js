'use strict'

const jwt = require('jsonwebtoken')

// Precisa estar autenticado para acessar tal rota
exports.isAuthenticate = function (req, res, next) {
    const token = req.headers['x-access-token']

    if (!token) return res.json(401, { message: 'Token não fornecido' })
    return jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
        if (error) return res.json(401, { message: 'Token inválido' })
        next()
    })
}

// Rota restrita à Owners
exports.isOwner = function (req, res, next) {
    const token = req.headers['x-access-token']

    if (!token) return res.json(401, { message: 'Token não fornecido' })
    return jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
        if (error) return res.json(401, { message: 'Token inválido' })


        console.log("PROFILE: " + decoded.profile)
        if (decoded.profile != 'owner') return res.json(403, { message: 'Restrito à Owners' })
        next()
    })
}
