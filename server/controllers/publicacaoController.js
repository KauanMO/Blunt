const model = require('../models/publicacaoModel')

function publicar(req, res) {
    model.publicar(req.body.textoUsuarioServer, req.body.fkUsuarioServer).then(result => {
        res.send(result)
    })
}

function buscarFeedForYou(req, res) {
    model.buscarFeedForYou(req, res).then(result => {
        res.json(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

module.exports = {
    publicar,
    buscarFeedForYou
}