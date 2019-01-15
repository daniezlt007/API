'use strict'

const jwt = require('jsonwebtoken')

const authenticate = (routes) => {
    return async (req, res, next) => {
        if (!routes.exclusions.includes(req.href())) {
            const token = req.headers['x-access-token']

            if (!token) return res.json(401, { message: 'Authenticate: Token não fornecido' })
            return jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
                if (error) return res.json(401, { message: 'Authenticate: Token inválido' })
                next()
            })
        }
        next()
    }
}

module.exports = authenticate
