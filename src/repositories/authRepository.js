'use strict';

const db = require('../database/config')

exports.auth = async (user) => {
    const connection = await db.connection()
    let select = await connection.select('uuid', 'name', 'profile')
    .from('person')
    .where('phone', user.phone)
    .andWhere('password', user.password)
    return select
}
