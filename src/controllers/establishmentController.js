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

        const filename = await uuid().toString() + '.jpg'
        /*const bucketName = 'project-img-bucket'
        let rawdata = data.photo
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        let fileType = matches[1]
        let buffer = new Buffer(matches[2], 'base64')

        let s3Params = {
            Bucket: bucketName,
            Key: fileName,
            Body: buffer,
            ContentEncoding: 'base64',
            ContentType: fileType,
            ACL: 'public-read'
        }*/

        // Envia a foto para o bucket
        //await s3.putObject(s3Params)

        const token = await auth.decodeToken(req.headers['authorization'])

        const establishment = {
            id: data.id, // ID do estabelecimento
            person_id: token.id, // ID do usuário
            photo: filename // Foto
        }

        // Faz o update no banco
        await repository.storePhoto(establishment)

        return res.json(201, { message: 'Foto enviada com sucesso' })
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

        await repository.deletePhoto(establishment)

        /*let bucketName = 'project-img-bucket'

        let s3Params = {
            Bucket: bucketName,
            Key: data.photo
        }*/

        // Deleta a foto do bucket
        //await s3.deleteObject(s3Params)

        return res.json(200, { message: 'Foto deletada com sucesso' })
    } catch(error) {
        console.error(error)
        return res.json(400, { message: error.message })
    }
}
