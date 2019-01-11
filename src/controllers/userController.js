'use strict'

const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')
const repository = require('../repositories/userRepository')
const authService = require('../services/authService')
const validator = require('validator')

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

        // Melhorar esta validação
        const empty = validator.isEmpty(user.name) || validator.isEmpty(user.nickname) || validator.isEmpty(user.phone) || validator.isEmpty(user.email)
        if (empty) { return res.send(400, { message: 'Preencha todos os campos' }) }

        await repository.create(user)

        return res.send(201, {
            token: await authService.generateToken({ id, establishment_id: null, profile: 'client' })
        })
    } catch(error) {
        return res.send(400, { message: error.message })
    }
}
