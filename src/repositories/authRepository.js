'use strict'

const db = require('../database/config')

exports.login = async (user) => {
    return new Promise((resolve, reject) => {
        try {
            const connection = db.connection()
            connection.select('id', 'establishment_id', 'nickname', 'profile', 'password')
            .from('person')
            .where({
                'phone': user.phone,
                'password': user.password
            })
            .then((result) => {
                if (!result || !result[0])  {
                    reject('CAIU NO REJECT')
                }
                resolve(result)
            })
        } catch(e) {
            console.log('Erro: ' + e)
        }
    })
}
