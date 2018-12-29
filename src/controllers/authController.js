'use strict';

const repository = require('../repositories/authRepository')
const authService = require('../services/authService')
const bcrypt = require('bcrypt')

exports.post = async (req, res, next) => {
    try {
        const saltRounds = 10
        bcrypt.hash(req.body.password, saltRounds, async (hash) => {
            const payload = {
                phone: req.body.phone,
                password: hash
            }

            console.log("HASH: ", hash)

            var user = await repository.auth(payload)

            if (user[0]) {
                res.send({
                    token: await authService.generateToken({ ...user[0] }),
                    user: user[0]
                })
            } else {
                res.send({
                    message: "Telefone ou senha incorretos"
                })
            }
        })
    } catch (err) {
        return res.send({
            message: err
        })
    }
}
