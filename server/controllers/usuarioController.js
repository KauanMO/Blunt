const model = require('../models/usuarioModel')

function listarUsuarios(req, res) {
    model.listarUsuarios().then(result => {
        res.json(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function cadastrarUsuario(req, res) {
    console.log(req.body)
    model.cadastrarUsuario(
        req.body.usernameServer,
        req.body.emailServer,
        req.body.senhaServer,
        req.body.dtNascServer,
        req.body.nomeExibServer
    ).then(result => {
        res.json(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

module.exports = {
    listarUsuarios,
    cadastrarUsuario
}