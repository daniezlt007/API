'use strict'

const db = require('../database/config')

exports.create = async (user) => {
    try {
        const connection = await db.connection()
        const data = await connection.insert(user).table('person')
        return data
    } catch(e) {
        return e
    }
}
