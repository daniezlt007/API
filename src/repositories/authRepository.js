'use strict'

const db = require('../database/config')
const bcrypt = require('bcrypt')

exports.login = async (user) => {
    return new Promise((resolve, reject) => {
        try {
            const connection = db.connection()
            connection.select('id', 'establishment_id', 'nickname', 'profile', 'phone', 'password')
            .from('person')
            .where({
                'phone': user.phone
            })
            .then((result) => {
                if (!result || !result[0])  {
                    reject('CAIU NO REJECT')
                }

                bcrypt.compare(user.password, result.password).then(() => {
                    resolve(result)
                })
            })
        } catch(e) {
            console.log('Erro: ' + e)
        }
    })
}
