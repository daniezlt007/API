'use strict'

const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')
const repository = require('../repositories/userRepository')
const authService = require('../services/authService')

exports.register = async (req, res, next) => {
    try {
        const id = await uuid()
        const hash = await bcrypt.hash(req.body.password, 10)

        const user = {
            id: id,
            name: req.body.name,
            nickname: req.body.nickname,
            phone: req.body.phone,
            email: req.body.email,
            password: hash
        }

        const data = await repository.create(user)

        if (data) {
            return res.send(201, {
                token: await authService.generateToken({ ...data }),
                id: id,
                establishment_id: '',
                profile: '',
                nickname: ''
            })
        }
    } catch(e) {
        return res.send(400, { message: e.message })
    }
}
