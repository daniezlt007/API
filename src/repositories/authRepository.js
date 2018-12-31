'use strict'

const db = require('../database/config')

exports.login = async (user) => {
    try {
        const connection = await db.connection()
        let select = await connection.select('id', 'name', 'profile')
        .from('person')
        .where('phone', user.phone)
        .andWhere('password', user.password)

        return select
    } catch(error) {
        return false
    }
}
