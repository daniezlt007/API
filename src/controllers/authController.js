'use strict'

const joi = require('joi')
const repository = require('../repositories/authRepository')
const auth = require('../services/auth')

exports.login = async (req, res) => {
    try {
        const loginSchema = joi.object().keys({
            phone: joi.string().regex(/^\(\d{2}\)\s\d{5}-?\d{4}$/),
            password: joi.string().min(8).required()
        })

        const data = await joi.validate(req.body, loginSchema)

        const credentials = {
            phone: data.phone,
            password: data.password
        }

        const user = await repository.login(credentials)
        const { id, establishment_id, profile, nickname } = user[0]

        return res.json(200, {
            token: await auth.generateToken({ id, establishment_id, profile }),
            nickname: nickname
        })
    } catch (error) {
        console.error(error)
        return res.json(400, { message: error.message })
    }
}
