'use strict'

exports.welcome = async (req, res, next) => {
    return res.send(200, 'Hello World')
}
