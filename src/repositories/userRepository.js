'use strict'

const db = require('../database/config')

exports.create = async (user) => {
    const connection = db.connection()
    await connection.insert(user).into('person')
    .then(() => {
        const result = connection.select('establishment_id', 'profile')
        .from('person')
        .where('id', user.id)

        if (result.length === 0) throw new Error('Erro inesperado')
        return result
    })
}
