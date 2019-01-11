'use strict'

require('dotenv').config()

module.exports = {
    connection: () => {
        const connection = require('knex')({
            client: 'mysql',
            version: '5.7',
            connection: {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            }
        })
        return connection
    }
}
