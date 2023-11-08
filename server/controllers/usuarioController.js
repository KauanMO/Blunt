const model = require('../models/usuarioModel')
const token = require('../utils/token')

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

function buscarInfoUsuarioUsername(req, res) {
    model.buscarInfoUsuarioUsername(req.params.username).then(result => {
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
        if (result.length > 0) {
            res.status(200).send({
                idUsuario: result[0].idUsuario,
                username: result[0].username,
                userToken: token.criarToken(result[0].idUsuario)
            })
        }

        res.status(201).end()
    }).catch(e => {
        console.log(e)
        res.status(500).end()
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
    buscarInfoUsuarioUsername,
    buscarFotoUsuario,
    cadastrarUsuario,
    buscarUsuarioPorCampo,
    atualizarUsuario,
    login,
    deletar
}