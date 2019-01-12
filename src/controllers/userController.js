'use strict'

const joi = require('joi')
const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')
const repository = require('../repositories/userRepository')
const authService = require('../services/authService')

exports.register = async (req, res, next) => {
    try {
        const schema = joi.object().keys({
            name: joi.string().required(),
            nickname: joi.string().required(),
            phone: joi.string().regex(/^\(\d{2}\)\s\d{5}-?\d{4}$/),
            email: joi.string().email({ minDomainAtoms: 2 }),
            password: joi.string().min(8).required()
        })

        const data = await joi.validate(req.body, schema)
        const id = await uuid()
        const hash = await bcrypt.hash(data.password, 10)

        const user = {
            id: id,
            name: data.name,
            nickname: data.nickname,
            phone: data.phone,
            email: data.email,
            password: hash
        }

        await repository.create(user)

        return res.send(201, {
            token: await authService.generateToken({ id, profile: 'client' })
        })
    } catch(error) {
        console.error(error)

        // Remove o possível retorno do password
        delete error.details[0]['context']
        delete error._object
        return res.send(400, { error })
    }
}
