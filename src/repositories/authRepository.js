'use strict'

const db = require('../database/config')
const bcrypt = require('bcrypt')

exports.login = async (user) => {
    return new Promise((resolve, reject) => {
        try {

            const connection = db.connection()
            connection.select('id', 'establishment_id', 'nickname', 'profile', 'phone', 'password')
            .from('person').where({ 'phone': user.phone })
            .then((result) => {
                bcrypt.compare(user.password, result[0].password)
                .then((res) => {
                    if (res && result) {
                        resolve(result)
                    }
                    reject('Senha inválida')
                })
            }).catch (() => reject('Telefone não encontrado'))

        } catch(e) {
            console.log('Erro: ' + e) // catch não esta sendo usado
        }
    })
}
