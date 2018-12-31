'use strict'

const db = require('../database/config')

exports.create = async (user) => {
    try {
        const connection = await db.connection()
        await connection.insert(user).table('person')
        return true
    } catch(error) {
        return false
    }
}
