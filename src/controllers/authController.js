'use strict'

const repository = require('../repositories/authRepository')
const authService = require('../services/authService')

exports.login = async (req, res, next) => {
    try {
        const credentials = {
            phone: req.body.phone,
            password: req.body.password
        }

        const data = await repository.login(credentials)

        if (data[0]) {
            const { id, establishment_id, profile, nickname } = data[0]

            return res.send(200, {
                token: await authService.generateToken({ id, establishment_id, profile, nickname })
            })
        }
        return res.send(400, { message: 'Telefone ou senha incorretos' })
    } catch (e) {
        return res.send(400, { message: 'Erro: ' + e })
    }
}
