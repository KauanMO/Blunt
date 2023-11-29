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

async function buscarQuantidadeSeguidores(req, res) {
    try {
        const qtdSeguidores = await model.buscarQuantidadeSeguidores(req.params.fkSeguido)
        res.send(String(qtdSeguidores[0].qtdSeguidores))
    } catch (e) {
        console.log(e)
        res.status(500).send({ clientMessage: 'Erro ao buscar quantidade de seguidores', serverMessage: `Erro ao buscar quantidade de seguidores: ${e}` })
    }
}

async function buscarInfoSeguidores(req, res) {
    try {
        const qtdSeguidores = await model.buscarInfoSeguidores(req.params.fkSeguido)
        res.send(qtdSeguidores)
    } catch (e) {
        console.log(e)
        res.status(500).send({ clientMessage: 'Erro ao buscar os seguidores', serverMessage: `Erro ao buscar os seguidores: ${e}` })
    }
}

module.exports = {
    seguir,
    deixarSeguir,
    verificarSeguidor,
    buscarQuantidadeSeguidores,
    buscarInfoSeguidores
}