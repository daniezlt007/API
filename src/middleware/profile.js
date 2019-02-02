'use strict'

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

// access() = qualquer um logado pode accessar
// access('user', 'admin') // so perfil user e admin podem
exports.access = (...profiles = []) => (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
      return res.json(401, { message: 'Token não fornecido' })
    } 

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
          return res.json(401, { message: 'Token inválido' })
        }

        if (profiles.length === 0 || profiles.includes(decoded.profile)) {
          return next();
        }

        return res.json(403, { message: 'Acesso restrito' })
    })
}
