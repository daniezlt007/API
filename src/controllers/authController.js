'use strict'

const repository = require('../repositories/authRepository')
const authService = require('../services/authService')

exports.login = async (req, res, next) => {
    try {
        const credentials = {
            phone: req.body.phone,
            password: req.body.password
        }

        const data = await repository.login(credentials)

        if (data) {
            const { id, establishment_id, profile, nickname } = data[0]

            return res.send(200, {
                token: await authService.generateToken({ id, establishment_id, profile, nickname })
            })
        }
        return res.send(404, { message: 'Telefone ou senha inválido' }) // nunca cai nesse return
    } catch (e) {
        // retorna: Error: Telefone não encontrado at Object.exports.login (/var/www/api/src/repositories/authRepository.js:12:15)
        console.error(e)

        return res.send(400, { message: e }) // retorna: message: {}
    }
}
