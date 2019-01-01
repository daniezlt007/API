'use strict'

const bcrypt = require('bcrypt')
const repository = require('../repositories/authRepository')
const authService = require('../services/authService')

exports.login = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)

        const credentials = {
            phone: req.body.phone,
            password: hash
        }

        let data = await repository.login(credentials)
        console.log('DADOS RETORNADOS: ' + data)

        if (data[0]) {
            const { id, establishment_id, profile, nickname } = data[0]

            return res.send(200, {
                token: await authService.generateToken({ id, establishment_id, profile, nickname })
            })
        }
        return res.send(400, { message: 'Telefone ou senha incorretos' })
    } catch (err) {
        return res.send(400, { message: 'Erro: ' + err })
    }
}
