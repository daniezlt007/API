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

        const data = await repository.login(credentials)
        console.log('DADOS RETORNADOS: ' + data)

        if (data) {
            return res.send(200, {
                token: await authService.generateToken({ ...data }),
                id: '',
                establishment_id: '',
                profile: '',
                nickname: ''
            })
        }
        return res.send(400, { message: 'Telefone ou senha incorretos' })
    } catch (error) {
        return res.send(400, { message: 'Erro: ' + error })
    }
}
