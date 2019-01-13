'use strict'

const db = require('../database/config')

exports.create = async (user) => {
    const connection = db.connection()
    const rows = await connection('person').select('phone', 'email').where('phone', user.phone).orWhere('email', user.email)

    if (rows.length > 0) throw new Error('Telefone ou e-mail, já existem')

    return await connection('person').insert(user)
}

exports.update = async (user) => {
    const connection = db.connection()
    const result = await connection('person').select('id').where('id', user.id)

    if (result.length === 0) throw new Error('ID não encontrado')

    return await connection('person').where('id', user.id).update(user)
}
