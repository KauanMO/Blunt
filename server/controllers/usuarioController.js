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

function buscarUsuarioPorCampo(req, res) {
    model.buscarUsuarioPorCampo(req.params.campo, req.params.valor).then(result => {
        res.json(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function atualizarUsuario(req, res) {
    model.atualizaUsuario(req.params.campo, req.params.valor, req.params.idUsuario).then(result => {
        res.json(result)
    }).catch(e => {
        console.log(e)
        res.status(500).son
    })
}

module.exports = {
    listarUsuarios,
    cadastrarUsuario,
    buscarUsuarioPorCampo,
    atualizarUsuario
}