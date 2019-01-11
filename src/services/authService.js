'use strict'

const jwt = require('jsonwebtoken')

exports.generateToken = async (data) => {
    return jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d' })
}

exports.decodeToken = async (token) => {
    return await jwt.verify(token, process.env.SALT_KEY)
}

exports.authorize = function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) return res.json(400, { message: 'Acesso restrito' })
    return jwt.verify(token, process.env.SALT_KEY, function (error, decoded) {
        if (error) return res.json(400, { message: 'Token inválido' })
        next()
    })
}
