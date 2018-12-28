'use strict';

const repository = require('../repositories/authRepository')
const authService = require('../services/authService')
const bcrypt = require('bcrypt')

exports.post = async (req, res, next) => {
    try {
        //const saltRounds = 10

        const payload = {
            phone: req.body.phone,
            password: req.body.password
        }
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

        /*bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            const payload = {
                phone: req.body.phone,
                password: hash
            }
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
        })*/
    } catch (e) {
        res.send({
            message: e.message
        })
    }
}
