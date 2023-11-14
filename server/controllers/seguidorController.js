const model = require('../models/seguidorModel')

async function seguir(req, res) {
    try {
        await model.seguir(req.body.fkSeguidor, req.body.fkSeguido)
        res.status(200).end()
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

async function deixarSeguir(req, res) {
    try {
        await model.deixarDeSeguir(req.body.fkSeguidor, req.body.fkSeguido)
        res.status(200).end()
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

async function verificarSeguidor(req, res) {
    try {
        const buscaSeguidor = await model.buscarSeguidor(req.params.fkSeguidor, req.params.fkSeguido)
        res.send(buscaSeguidor.length > 0)
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

module.exports = {
    seguir,
    deixarSeguir,
    verificarSeguidor
}