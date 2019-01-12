'use strict'

const db = require('../database/config')
const bcrypt = require('bcrypt')

exports.login = async (user) => {
    const connection = db.connection()
    const rows = await connection.select('id', 'establishment_id', 'nickname', 'profile', 'phone', 'password')
    .from('person').where('phone', user.phone)

    if (rows.length === 0) throw new Error('Telefone não encontrado')

    const isValid = await bcrypt.compare(user.password, rows[0].password)

    if (!isValid) throw new Error('Senha inválida')
    return rows
}
