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
        const infoSeguidor = await model.buscarInfoSeguidores(req.params.fkSeguido)
        res.send(infoSeguidor)
    } catch (e) {
        console.log(e)
        res.status(500).send({ clientMessage: 'Erro ao buscar os seguidores', serverMessage: `Erro ao buscar os seguidores: ${e}` })
    }
}

async function buscarQuantidadeSeguindo(req, res) {
    try {
        const qtdSeguindo = await model.buscarQuantidadeSeguindo(req.params.fkSeguidor)
        res.send(String(qtdSeguindo[0].qtdSeguindo))
    } catch (e) {
        console.log(e)
        res.status(500).send({ clientMessage: 'Erro ao buscar quantidade de seguindo', serverMessage: `Erro ao buscar quantidade de seguindo: ${e}` })
    }
}

async function buscarInfoSeguindo(req, res) {
    try {
        const infoSeguindo = await model.buscarInfoSeguindo(req.params.fkSeguidor)
        res.send(infoSeguindo)
    } catch (e) {
        console.log(e)
        res.status(500).send({ clientMessage: 'Erro ao buscar os seguidores', serverMessage: `Erro ao buscar os seguidores: ${e}` })
    }
}

async function buscarSeguidoresReciprocos(req, res) {
    try {
        const seguidoresReciprocos = await model.buscarSeguidoresReciprocos(req.params.fkUsuario)
        res.send(seguidoresReciprocos)
    } catch (e) {
        console.log(e)
        res.status(500).send({ clientMessage: 'Erro ao buscar seguidores recíprocos', serverMessage: `Erro ao buscar seguidores recíprocos: ${e}` })
    }
}

module.exports = {
    seguir,
    deixarSeguir,
    verificarSeguidor,
    buscarQuantidadeSeguidores,
    buscarInfoSeguidores,
    buscarQuantidadeSeguindo,
    buscarInfoSeguindo,
    buscarSeguidoresReciprocos
}