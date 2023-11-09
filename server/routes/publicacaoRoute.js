const express = require('express')
const controller = require('../controllers/publicacaoController')
const router = express.Router()
const token = require('../utils/token')

router.post('/publicar', token.autenticarToken, (req, res) => {
    controller.publicar(req, res)
})

router.get('/foryou', (req, res) => {
    controller.buscarFeedForYou(req, res)
})

// Buscar publicações usuário
router.get('/bpu/:idUsuario', (req, res) => {
    controller.buscarPublicacoesUsuario(req, res)
})

// Buscar publicações curtidas por usuário
router.get('/bpcu/:idUsuario', (req, res) => {
    controller.buscarPublicacoesCurtidasUsuario(req, res)
})

module.exports = router