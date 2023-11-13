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
        res.send(result[0])
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

async function cadastrarUsuario(req, res) {
    try {
        await model.cadastrarUsuario(
            req.body.usernameServer,
            req.body.emailServer,
            req.body.senhaServer,
            req.body.dtNascServer,
            req.body.nomeExibServer
        )

        const login = await model.login(req.body.usernameServer, req.body.senhaServer)
        res.status(200).send({
            idUsuario: login[0].idUsuario,
            username: login[0].username,
            userToken: await token.criarToken(login[0].idUsuario)
        })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
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

async function login(req, res) {
    try {
        const result = await model.login(req.body.emailServer, req.body.senhaServer)
        if (result.length > 0) {
            res.status(200).send({
                idUsuario: result[0].idUsuario,
                username: result[0].username,
                userToken: await token.criarToken(result[0].idUsuario)
            })
        } else {
            res.status(201).end()
        }
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
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