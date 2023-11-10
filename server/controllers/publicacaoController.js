const model = require('../models/publicacaoModel')

function publicar(req, res) {
    model.publicar(req.body.textoUsuarioServer, req.body.fkUsuarioServer, req.body.nanoIdServer).then(result => {
        res.send(result)
    })
}

function buscarFeedForYou(req, res) {
    model.buscarFeedForYou().then(result => {
        res.json(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function buscarPublicacoesUsuario(req, res) {
    model.buscarPublicacoesUsuario(req.params.idUsuario).then(result => {
        res.json(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function buscarPublicacoesCurtidasUsuario(req, res) {
    model.buscarPublicacoesCurtidasUsuario(req.params.idUsuario).then(result => {
        res.json(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

async function buscarPublicacoesPorNanoId(req, res) {
    try {
        result = await model.buscarPublicacoesPorNanoId(req.params.nanoId)
        res.status(200).send(result[0])
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

module.exports = {
    publicar,
    buscarFeedForYou,
    buscarPublicacoesUsuario,
    buscarPublicacoesCurtidasUsuario,
    buscarPublicacoesPorNanoId
}