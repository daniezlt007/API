'use strict';

require('dotenv').config()

module.exports = {
    connection: () => {
        // Erro na conexão
        console.log(process.env)

        const connection = require('knex')({
            client: 'mysql', // Usar MariaDB
            version: '5.7',
            connection: {
                host: process.env.HOST,
                user: process.env.USERNAME,
                password: process.env.PASSWORD,
                database: process.env.DATABASE
            }
        })
        return connection
    }
}
