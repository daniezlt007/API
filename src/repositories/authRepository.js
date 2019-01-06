'use strict'

const db = require('../database/config')
const bcrypt = require('bcrypt')

exports.login = async (user) => {
    const connection = db.connection()
    const result = connection.select('id', 'establishment_id', 'nickname', 'profile', 'phone', 'password')
    .from('person').where({ 'phone': user.phone })

    console.log(result[0].password)
    if (!result) {
        throw new Error('Usuário não encontrado')
    }

    const res = await bcrypt.compare(user.password, result[0].password)

    if (!res) {
       throw new Error('Senha inválida')
    }
    return result
}
