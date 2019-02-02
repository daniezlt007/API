'use strict'

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

exports.access = (...profiles) => (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
      return res.json(401, { message: 'Token não fornecido' })
    }

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
          return res.json(401, { message: 'Token inválido' })
        }

        console.log(profiles)
        if (profiles.length === 0 || profiles.includes(decoded.profile)) {
            return next()
        }
        return res.json(403, { message: 'Acesso restrito' })
    })
}
