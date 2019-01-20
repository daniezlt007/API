'use strict'

const joi = require('joi')
const uuid = require('uuid/v4')
const repository = require('../repositories/establishmentRepository')
const auth = require('../services/auth')

exports.store = async (req, res) => {
    try {
        const establishmentSchema = joi.object().keys({
            name: joi.string().required(),
            category: joi.string().required(),
            uf: joi.string().length(2).required(),
            city: joi.string().required()
        })

        const data = await joi.validate(req.body, establishmentSchema)
        const id = await uuid()

        // Salva a imagem
        /*let filename = await uuid().toString() + '.jpg'
        let rawdata = req.body.photo
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        let type = matches[1]
        let buffer = new Buffer(matches[2], 'base64')

        await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
            contentType: type
        }, function (error, result, response) {
            if (error) {
                filename = 'default-product.png'
            }
        })*/

        // Pega o UUID do usuário
        const token = await auth.decodeToken(req.headers['x-access-token'])

        const establishment = {
            id: id,
            person_id: token.id,
            name: data.name,
            category: data.category,
            uf: data.uf,
            city: data.city
        }

        await repository.create(establishment)

        return res.json(201, { message: 'Estabelecimento criado com sucesso' })
    } catch(error) {
        console.error(error)
        return res.json(400, { message: error.message })
    }
}
