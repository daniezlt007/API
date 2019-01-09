'use strict'

const db = require('../database/config')

exports.create = async (user) => {
    const connection = db.connection()
    await connection.insert(user).into('person')
    .then(() => {
        // Se retirar o return, cai no catch abaixo e retorna Result: undefined
        return connection.select('establishment_id', 'profile').from('person').where('id', user.id)
    }).then((result) => {
        console.log('Result: ' + result) // Retorna o establishment_id e profile

        if (result.length === 0) throw new Error('Erro ao recuperar dados')
        return result
    }).catch(() => {
        throw new Error('Erro inesperado')
    })
}
