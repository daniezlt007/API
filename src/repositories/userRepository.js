'use strict'

const db = require('../database/config')

exports.create = async (user) => {
    const connection = db.connection()
    const data = await connection.insert(user).into('person')
    .then(() => {
        return connection.select('establishment_id', 'profile').from('person').where('id', user.id)
    })
    .then((result) => {
        /* Cannot read property 'length' of undefined
        if (result.length === 0) throw new Error('Erro ao recuperar dados') */

        //console.log('Result: ' + result[0].profile)

        return result
    })
    return data
}
