'use strict'

const db = require('../database/config')
const bcrypt = require('bcrypt')

exports.login = async (user) => {
    return new Promise((resolve, reject) => {
        try {
            const connection = db.connection()
            connection.select('id', 'establishment_id', 'nickname', 'profile', 'phone', 'password')
            .from('person')
            .where({ 'phone': user.phone })
            .then((result) => {
                if (!result || !result[0])  {
                    reject('CAIU NO REJECT')
                }

                // Compara a senha enviada, com a senha gravada no banco
                bcrypt.compare(user.password, result[0].password)
                .then(() => resolve(result))
                .catch(() => reject('CAIU NO REJECT'))
            })
        } catch(e) {
            console.log('Erro: ' + e)
        }
    })
}
