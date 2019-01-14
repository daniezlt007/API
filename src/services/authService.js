'use strict'

const jwt = require('jsonwebtoken')

exports.generateToken = async (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' })
}

exports.decodeToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET)
}

exports.isOwner = function (req, res, next) {
    const token = req.headers['x-access-token']

    if (!token) return res.json(401, { message: 'Token inválido' })
    return jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
        if (error) return res.json(401, { message: 'Token inválido' })

        if (decoded.profile != 'owner') return res.json(403, { message: 'Restrito à Owners' })
        next()
    })
}
