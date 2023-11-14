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

module.exports = router