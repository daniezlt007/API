'use strict';

const bcrypt = require('bcrypt')
const repository = require('../repositories/userRepository')
const uuid = require('uuid/v4')
const authService = require('../services/authService')

exports.register = async (req, res, next) => {
    try {
        var id = new Buffer.from(uuid().replace(/-/g, ''), 'hex')
        console.log('UUID GERADO ', id)

        const saltRounds = 10
        const hash = await bcrypt.hash(req.body.password, saltRounds)
        console.log('HASH GERADO ', hash)

        const user = {
            id: id,
            name: req.body.name,
            nickname: req.body.nickname,
            profile: req.body.profile,
            phone: req.body.phone,
            email: req.body.email,
            password: hash
        }

        var data = await repository.create(user)

        if (data[0] == 0) {
            return res.send({
                token: await authService.generateToken({ ...data[0] }),
                user: data[0]
            })
        }
        return res.send({ message: 'Erro ao cadastrar' })
    } catch(error) {
        return res.send({ message: 'Erro: ' + error })
    }
}
