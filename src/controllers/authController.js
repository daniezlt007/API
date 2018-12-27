'use strict';

const repository = require('../repositories/authRepository');
const authService = require('../services/authService');
const bcrypt = require('bcrypt');

exports.post = async (req, res, next) => {
    try {
        const payload = {
            email: req.body.email,
            password: bcrypt(req.body.password)
        };
        var user = await repository.auth(payload)

        res.status(200).send({
            token: await authService.generateToken({ ...user[0] }),
            user: user[0]
        })
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}
