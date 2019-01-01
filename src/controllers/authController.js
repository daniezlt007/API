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

        /*if (data[0]) {
            return res.send(200, {
                token: await authService.generateToken({ ...data[0] }),
                id: data[0].id,
                establishment_id: data[0].establishment_id,
                profile: data[0].profile,
                nickname: data[0].nickname
            })
        }
        return res.send(400, { message: 'Telefone ou senha incorretos' })*/
    } catch (err) {
        return res.send(400, { message: 'Erro: ' + err })
    }
}
