'use strict'

require('dotenv').config()

const server = require('../bin/server')

server.listen(process.env.PORT)
