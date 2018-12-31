'use strict'

const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')
const repository = require('../repositories/userRepository')
const authService = require('../services/authService')

exports.register = async (req, res, next) => {
    try {
        const saltRounds = 10
        const hash = await bcrypt.hash(req.body.password, saltRounds)

        const user = {
            id: uuid(),
            name: req.body.name,
            nickname: req.body.nickname,
            phone: req.body.phone,
            email: req.body.email,
            password: hash
        }

        const data = await repository.create(user)

        if (data) {
            return res.send(201, {
                token: await authService.generateToken({ ...data[0] }),
                user: data[0]
            })
        }
        return res.send(400, { message: 'Erro ao cadastrar' })
    } catch(error) {
        return res.send(400, { message: 'Erro: ' + error })
    }
}
