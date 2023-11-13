const model = require('../models/curtidaModel')

function curtir(req, res) {
    model.curtir(req.body.fkUsuario, req.body.fkPublicacao | req.body.fkComentario, req.body.campo).then(result => {
        res.send(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function descurtir(req, res) {
    model.descurtir(req.body.fkUsuario, req.body.fkPublicacao | req.body.fkComentario, req.body.campo).then(result => {
        res.send(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function verificarCurtida(req, res) {
    model.verificarCurtida(req.params.fkUsuario, req.params.fk, req.params.campo).then(result => {
        res.send(result.length > 0)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function contarCurtidasPub(req, res) {
    model.contarCurtidasPub(req.params.fkPublicacao).then(result => {
        res.send(result[0])
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function contarCurtidasCom(req, res) {
    model.contarCurtidasCom(req.params.fkComentario).then(result => {
        res.send(result[0])
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

module.exports = {
    curtir,
    descurtir,
    verificarCurtida,
    contarCurtidasPub,
    contarCurtidasCom
}