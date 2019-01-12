'use strict'

const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')
const repository = require('../repositories/userRepository')
const authService = require('../services/authService')
const { validateAll, rule } = require('indicative')

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

        const rules = {
            name: 'required|string',
            nickname: 'required|string',
            phone: [
                rule('regex', /\(\d{2}\)\s\d{5}-?\d{4}/)
            ],
            email: 'required|email',
            password: [
                rule('regex', /\d{36}/)
            ]
        }

        await validateAll(user, rules)

        await repository.create(user)

        return res.send(201, {
            token: await authService.generateToken({ id, profile: 'client' })
        })
    } catch(error) {
        console.error(error)
        return res.send(400, { message: error.message })
    }
}
