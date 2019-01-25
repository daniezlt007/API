'use strict'

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

// Precisa estar autenticado para acessar tal rota
exports.isAuthenticate = (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) return res.json(401, { message: 'Token não fornecido' })

    return jwt.verify(token, JWT_SECRET, (error) => {
        if (error) return res.json(401, { message: 'Token inválido' })
        next()
    })
}

// Rota restrita à Owners
exports.isOwner = (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) return res.json(401, { message: 'Token não fornecido' })

    return jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) return res.json(401, { message: 'Token inválido' })

        if (decoded.profile != 'owner') return res.json(403, { message: 'Restrito à Owners' })
        next()
    })
}

// Rota restrita à Managers
exports.isManager = (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) return res.json(401, { message: 'Token não fornecido' })

    return jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) return res.json(401, { message: 'Token inválido' })

        if (decoded.profile != 'manager') return res.json(403, { message: 'Restrito à Managers' })
        next()
    })
}
