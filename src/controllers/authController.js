'use strict'

const bcrypt = require('bcrypt')
const repository = require('../repositories/authRepository')
const authService = require('../services/authService')

exports.login = async (req, res, next) => {
    try {
        const saltRounds = 10
        const hash = await bcrypt.hash(req.body.password, saltRounds)

        const credencials = {
            phone: req.body.phone,
            password: hash
        }

        const data = await repository.login(credencials)
        console.log('DADOS RETORNADOS: ' + data)

        if (data) {
            return res.send(200, {
                token: await authService.generateToken({ ...data[0] }),
                user: data[0]
            })
        }
        return res.send(400, { message: 'Telefone ou senha incorretos' })
    } catch (error) {
        return res.send(400, { message: 'Erro: ' + error })
    }
}
