'use strict'

const db = require('../database/config')

exports.create = async (establishment) => {
    const connection = db.connection()
    const rows = await connection('establishment').select('person_id', 'name').where('person_id', establishment.person_id)

    if (rows.length > 0) throw new Error('O estabelecimento já existe')

    return await connection('establishment').insert(establishment)
}
