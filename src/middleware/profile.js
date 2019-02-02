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

//// OLD ////
// Precisa estar autenticado em qualquer nível, para acessar a rota
/*exports.isAuthenticate = (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) return res.json(401, { message: 'Token não fornecido' })

    return jwt.verify(token, JWT_SECRET, (error) => {
        if (error) return res.json(401, { message: 'Token inválido' })
        next()
    })
}

// Precisa estar autenticado em níveis específicos, para acessar a rota
exports.access = (...profile) => (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) return res.json(401, { message: 'Token não fornecido' })

    return jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) return res.json(401, { message: 'Token inválido' })

        // Quando na rota é passado 1 nível de acesso, exemplo: ('owner')
        if (profile.length === 1) {
            if (decoded.profile != profile[0]) return res.json(403, { message: 'Acesso restrito' })

            return next()
        }

        // Quando na rota é passado 2 níveis de acesso, exemplo: ('owner', 'manager')
        if (decoded.profile === profile[0] || decoded.profile === profile[1]) return next()

        return res.json(403, { message: 'Acesso restrito' })
    })
}*/
