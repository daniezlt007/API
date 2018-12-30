'use strict';

const db = require('../database/config')

exports.create = async (user) => {
    const connection = await db.connection()
    let insert = await connection.insert(user).table('person')
    return insert
}
