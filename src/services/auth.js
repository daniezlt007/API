'use strict'

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

exports.generateToken = async (data) => {
    return jwt.sign(data, JWT_SECRET, { expiresIn: '1d' })
}

exports.decodeToken = async (token) => {
    return await jwt.verify(token, JWT_SECRET)
}
