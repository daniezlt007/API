'use strict'

const db = require('../database/config')

exports.create = async (user) => {
    const connection = db.connection()
    await connection.insert(user).into('person')
    .then(() => {
        connection.select('establishment_id', 'profile').from('person').where('id', user.id)
    }).then((result) => {
        console.log('userRepository: ' + result) // Retorna o establishment_id e profile

        /* Cannot read property 'length' of undefined
        if (result.length === 0) throw new Error('Erro ao recuperar dados') */

        return result
    }).catch((error) => {
        console.error(error)
    })
}
