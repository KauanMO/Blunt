const model = require('../models/curtidaModel')

function curtir(req, res) {
    model.curtir(req.body.fkUsuario, req.body.fkPublicacao).then(result => {
        res.send(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function descurtir(req, res) {
    model.descurtir(req.body.fkUsuario, req.body.fkPublicacao).then(result => {
        res.send(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function verificarCurtida(req, res) {
    model.verificarCurtida(req.params.fkUsuario, req.params.fkPublicacao).then(result => {
        res.send(result.length > 0)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function contarCurtidasPub(req, res) {
    model.contarCurtidasPub(req.params.fkPublicacao).then(result => {
        res.send(result[0])
    }).catch(e=>{
        console.log(e)
        res.status(500).json
    })
}

module.exports = {
    curtir,
    descurtir,
    verificarCurtida,
    contarCurtidasPub
}