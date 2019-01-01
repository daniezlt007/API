'use strict'

const db = require('../database/config')

exports.create = async (user) => {
    try {
        const connection = await db.connection()
        const data = await connection.insert(user).table('person').returning('profile', 'nickname').get();
        return data
    } catch(error) {
        return error
    }
}
