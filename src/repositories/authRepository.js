'use strict'

const db = require('../database/config')

exports.login = async (user) => {
    try {
        const connection = db.connection()
        let data = await connection.select('id', 'establishment_id', 'nickname','profile')
        .from('person')
        .where({
            'phone': user.phone,
            'password': user.password
        })

        return data
    } catch(error) {
        return false
    }
}
