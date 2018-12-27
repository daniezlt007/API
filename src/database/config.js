'use strict';

require('dotenv').config()

module.exports = {
    connection: () => {
        const connection = require('knex')({
            client: 'mysql', // Usar MariaDB
            version: '5.7',
            connection: {
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE
            }
        })
        return connection
    }
}
