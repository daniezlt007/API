'use strict';

const bcrypt = require('bcrypt')
const repository = require('../repositories/authRepository')
const authService = require('../services/authService')

exports.login = async (req, res, next) => {
    try {
        const saltRounds = 10
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            const payload = {
                phone: req.body.phone,
                password: hash
            }

            var user = await repository.login(payload)

            if (user[0]) {
                return res.send({
                    token: await authService.generateToken({ ...user[0] }),
                    user: user[0]
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
