'use strict'

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

// Precisa estar autenticado para acessar tal rota
exports.isAuthenticate = (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) return res.json(401, { message: 'Token não fornecido' })

    return jwt.verify(token, JWT_SECRET).then(next).catch(() => res.json(401, { message: 'Token inválido' }))
}

// Rota restrita à Owners
exports.isOwner = async (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) return res.json(401, { message: 'Token não fornecido' })

    const decoded = await jwt.verify(token, JWT_SECRET)
    //.catch(() => res.json(401, { message: 'Token inválido' }))

    console.log(decoded)

    if (decoded.profile != 'owner') return res.json(403, { message: 'Restrito à Owners' })
}
