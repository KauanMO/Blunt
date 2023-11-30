const express = require('express')
const controller = require('../controllers/seguidorController')
const router = express.Router()
const token = require('../utils/token')

router.post('/seguir', token.autenticarToken, (req, res) => {
    controller.seguir(req, res)
})

// Deixar de seguir
router.post('/dds', token.autenticarToken, (req, res) => {
    controller.deixarSeguir(req, res)
})

// Verificar seguidor
router.get('/vs/:fkSeguidor/:fkSeguido', token.autenticarToken, (req, res) => {
    controller.verificarSeguidor(req, res)
})

// Buscar quantidade de seguidores
router.get('/bqtds/:fkSeguido', (req, res) => {
    controller.buscarQuantidadeSeguidores(req, res)
})

// Buscar info seguidores
router.get('/bis/:fkSeguido', token.autenticarToken, (req, res) => {
    controller.buscarInfoSeguidores(req, res)
})

// Buscar quantidade seguindo
router.get('/bqtdsd/:fkSeguidor', (req, res) => {
    controller.buscarQuantidadeSeguindo(req, res)
})

// Buscar info seguindo
router.get('/bisd/:fkSeguidor', (req, res) => {
    controller.buscarInfoSeguindo(req, res)
})

// Buscar seguidores recíprocos
router.get('/bsr/:fkUsuario', (req, res) => {
    controller.buscarSeguidoresReciprocos(req, res)
})

module.exports = router