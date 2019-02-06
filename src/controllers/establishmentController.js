'use strict'

const joi = require('joi')
const uuid = require('uuid/v4')
const repository = require('../repositories/establishmentRepository')
const auth = require('../services/auth')

// AWS S3
require('dotenv').config()
//const s3 = require('aws-sdk/clients/s3')

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

        const token = await auth.decodeToken(req.headers['authorization'])

        const establishment = {
            id: id, // ID do estabelecimento
            person_id: token.id, // ID do usuário
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

exports.storePhoto = async (req, res) => {
    try {
        const establishmentSchema = joi.object().keys({
            id: joi.string().guid('uuidv4')
        })

        const data = await joi.validate(req.params, establishmentSchema)

        const token = await auth.decodeToken(req.headers['authorization'])

        // Gera um nome para a foto
        const filename = await uuid().toString() + '.jpg'

        const establishment = {
            id: data.id, // ID do estabelecimento
            person_id: token.id, // ID do usuário
            photo: filename // Foto
        }

        // S3
        const bucketName = 'project-images-establishment'
        const rawdata = data.photo
        const matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        const fileType = matches[1]
        const buffer = new Buffer(matches[2], 'base64')

        const s3Params = {
            Bucket: bucketName,
            Key: fileName,
            Body: buffer,
            ContentEncoding: 'base64',
            ContentType: fileType,
            ACL: 'public-read'
        }

        // Faz o update no banco (apenas o nome da foto .jpg)
        await repository.storePhoto(establishment)

        // Envia a foto para o bucket
        await s3.putObject(s3Params)

        return res.json(201, { message: 'Foto cadastrada com sucesso' })
    } catch(error) {
        console.error(error)
        return res.json(400, { message: error.message })
    }
}

exports.deletePhoto = async (req, res) => {
    try {
        const establishmentSchema = joi.object().keys({
            id: joi.string().guid('uuidv4'),
            photo: joi.string().required()
        })

        const data = await joi.validate(req.body, establishmentSchema)

        const token = await auth.decodeToken(req.headers['authorization'])

        const establishment = {
            id: data.id, // ID do estabelecimento
            person_id: token.id, // ID do usuário
            photo: data.photo // Foto
        }

        const bucketName = 'project-images-establishment'

        const s3Params = {
            Bucket: bucketName,
            Key: data.photo
        }

        // Deleta a foto do bucket
        await s3.deleteObject(s3Params)

        // Faz o update no banco (NULL)
        await repository.deletePhoto(establishment)

        return res.json(200, { message: 'Foto deletada com sucesso' })
    } catch(error) {
        console.error(error)
        return res.json(400, { message: error.message })
    }
}
