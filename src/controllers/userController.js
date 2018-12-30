'use strict';

const bcrypt = require('bcrypt')
const repository = require('../repositories/userRepository')
const uuid = require('uuid/v1')
const authService = require('../services/authService')

exports.register = async (req, res, next) => {
    try {
        const saltRounds = 10
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            const user = {
                uuid: uuid.apply(),
                name: req.body.name,
                nickname: req.body.nickname,
                phone: req.body.phone,
                email: req.body.email,
                password: hash
            }

            var data = await repository.register(user)

            if (data[0]) {
                return res.send({
                    token: await authService.generateToken({ ...data[0] }),
                    user: data[0]
                })
            }
            return res.send({ message: 'Erro ao cadastrar' })
        })
    } catch(e) {
        return res.send({ message: 'Erro: ', e })
    }
}
