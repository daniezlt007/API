'use strict'

const db = require('../database/config')

exports.create = async (establishment) => {
    const connection = db.connection()
    const rows = await connection('establishment').select('person_id', 'name')
    .where('person_id', establishment.person_id)

    if (rows.length > 0) throw new Error('O estabelecimento já existe')

    return await connection('establishment').insert(establishment)
}

exports.storePhoto = async (establishment) => {
    const connection = db.connection()
    const rows = await connection('establishment').select('id', 'person_id')
    .where({
        'id': establishment.id,
        'person_id': establishment.person_id
    })

    if (rows.length === 0) throw new Error('Estabelecimento não encontrado ou não pertence ao usuário')

    return await connection('establishment').where('id', establishment.id).update('photo', establishment.photo)
}

exports.deletePhoto = async (establishment) => {
    const connection = db.connection()
    const rows = await connection('establishment').select('id', 'person_id', 'photo')
    .where({
        'id': establishment.id,
        'person_id': establishment.person_id,
        'photo': establishment.photo
    })

    if (rows.length === 0) throw new Error('Estabelecimento não encontrado ou não pertence ao usuário')

    return await connection('establishment').where('id', establishment.id).update('photo', null)
}
