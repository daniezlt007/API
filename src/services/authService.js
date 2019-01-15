'use strict'

const jwt = require('jsonwebtoken')

exports.generateToken = async (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' })
}

exports.decodeToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET)
}
