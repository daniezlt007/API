'use strict'

const db = require('../database/config')

exports.create = async (user) => {
    const connection = db.connection()

    const data = await connection.select('phone', 'email').from('person').where('phone', user.phone).orWhere('email', user.email)

    if (data.length > 0) {
        throw new Error('Telefone ou e-mail, já existem')
    }
    return await connection.insert(user).into('person').return(true)
}
