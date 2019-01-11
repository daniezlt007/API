'use strict'

const db = require('../database/config')

exports.create = async (user) => {
    const connection = db.connection()
    await connection.insert(user).into('person')

    const rows = await connection.select('establishment_id', 'profile').from('person').where('id', user.id)

    if (rows.length === 0) throw new Error('Erro ao recuperar dados')
    return rows
}
