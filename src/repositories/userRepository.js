'use strict'

const db = require('../database/config')

exports.create = async (user) => {
    const connection = db.connection()
    const result = await connection.insert(user).table('person').returning('profile')

    if (result.length === 0) throw new Error('Profile não encontrado')
    return result
}
