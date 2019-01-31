'use strict'

const joi = require('joi')
const uuid = require('uuid/v4')
//const repository = require('../repositories/itemRepository')
const auth = require('../services/auth')

exports.store = async (req, res) => {
    try {
        const itemSchema = joi.object().keys({
            establishment_id: joi.string().guid('uuidv4'),
            photo: joi.string().required(),
            name: joi.string().required(),
            stock: joi.number().integer(),
            type: joi.string().length(7).required(),
            //score: joi.string().min(8).required()
        })

        const data = await joi.validate(req.body, itemSchema)
        const id = await uuid()

        const token = await auth.decodeToken(req.headers['x-access-token'])

        const item = {
            id: id, // ID do item
            person_id: token.id, // ID do usuário
            establishment_id: data.establishment_id, // ID do estabelecimento
            photo: data.photo,
            name: data.name,
            stock: data.stock,
            type: data.type,
            //score: data.score
        }

        await repository.create(item)

        return res.json(201, { message: 'Item cadastrado com sucesso' })
    } catch(error) {
        console.error(error)
        return res.json(400, { message: error.message })
    }
}
