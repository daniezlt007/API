'use strict';

const bcrypt = require('bcrypt')
const repository = require('../repositories/authRepository')
const authService = require('../services/authService')

exports.login = async (req, res, next) => {
    try {
        const saltRounds = 10
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            const credencials = {
                phone: req.body.phone,
                password: hash
            }

            var data = await repository.login(credencials)

            if (data[0]) {
                return res.send({
                    token: await authService.generateToken({ ...data[0] }),
                    user: data[0]
                })
            }
            return res.send({ message: 'Telefone ou senha incorretos' })
        })
    } catch (e) {
        return res.send({ message: 'Erro: ', e })
    }
}

exports.refresh = async (req, res, next) => {
    try {
        // TODO
    } catch(e) {
        return res.send({ message: 'Erro: ', e })
    }
}
