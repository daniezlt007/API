'use strict'

const jwt = require('jsonwebtoken')

const autenticate = (routes) => {
    return async (req, res, next) => {
      if (!routes.exclusions.includes(req.href())) {
        const token = req.headers['x-access-token']

        if (!token) return res.json(401, { message: 'Token não fornecido' })
        return jwt.verify(token, process.env.SALT_KEY, function (error, decoded) {
            if (error) return res.json(401, { message: 'Token inválido' })
            next()
        })
      }
      next()
    }
  }

  module.exports = autenticate
