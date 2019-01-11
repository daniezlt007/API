'use strict'

const repository = require('../repositories/authRepository')
const authService = require('../services/authService')

exports.login = async (req, res, next) => {
    try {
        const credentials = {
            phone: req.body.phone,
            password: req.body.password
        }

        const user = await repository.login(credentials)
        const { id, establishment_id, profile, nickname } = user[0]

        return res.send(200, {
            token: await authService.generateToken({ id, establishment_id, profile }),
            nickname: nickname
        })
    } catch (error) {
        console.error(error)
        return res.send(400, { message: error.message })
    }
}
