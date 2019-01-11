'use strict'

const db = require('../database/config')

exports.create = async (user) => {
    const connection = db.connection()
    const rows = await connection.select('phone', 'email').from('person').where('phone', user.phone).orWhere('email', user.email)

    if (rows.length > 0) throw new Error('Telefone ou e-mail, já existem')

    return await connection.insert(user).into('person')
}
