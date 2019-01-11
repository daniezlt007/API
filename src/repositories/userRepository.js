'use strict'

const db = require('../database/config')

exports.create = async (user) => {
    const connection = db.connection()
    return await connection.insert(user).into('person')
    .then(() => {
        return connection.select('establishment_id', 'profile').from('person').where('id', user.id)
    })
    .then((rows) => {
        if (rows.length === 0) throw new Error('Erro ao recuperar dados')
        return rows
    })
}
