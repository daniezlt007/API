'use strict';

const db = require('../database/config');

exports.auth = async (user) => {
    const connection = await db.connection();
    let [rows] = await connection.execute('SELECT uuid, name, profile FROM person WHERE email = ? and password = ?', [user.email, user.password])
    return rows
}
