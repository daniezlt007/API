'use strict'

const db = require('../database/config')

exports.login = async (user) => {
    try {
        const connection = db.connection()
        await connection.select('id', 'establishment_id', 'nickname', 'profile')
        .from('person')
        .where({
            'phone': user.phone,
            'password': user.password
        })
        .then((result) => {
            if (!result || !result[0])  {
                return false
            }
            return result
        })
    } catch(err) {
        console.log('Erro: ' + err)
    }
}
