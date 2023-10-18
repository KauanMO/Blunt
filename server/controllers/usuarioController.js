const model = require('../models/usuarioModel')

function listarUsuarios(req, res) {
    model.listarUsuarios().then(result => {
        res.json(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function buscarInfoUsuario(req, res) {
    model.buscarInfoUsuario(req.params.idUsuario).then(result => {
        res.json(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function buscarFotoUsuario(req, res) {
    model.buscarFotoUsuario(req.params.idUsuario).then(result => {
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
    model.atualizarUsuario(req.params.campo, req.params.valor, req.params.idUsuario).then(result => {
        res.json(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function login(req, res) {
    model.login(req.params.email, req.params.senha).then(result => {
        console.log(result[0].idUsuario)
        res.send(
            {
                login: result.length > 0,
                idUsuario: result[0].idUsuario
            }
        )
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function deletar(req, res) {
    model.deletar(req.params.idUsuario, req.params.senha).then(result => {
        res.json(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

module.exports = {
    listarUsuarios,
    buscarInfoUsuario,
    buscarFotoUsuario,
    cadastrarUsuario,
    buscarUsuarioPorCampo,
    atualizarUsuario,
    login,
    deletar
}