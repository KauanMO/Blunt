const express = require('express')
const controller = require('../controllers/curtidaController')
const router = express.Router()

router.post('/curtir', (req, res) => {
    controller.curtir(req, res)
})

router.post('/descurtir', (req, res) => {
    controller.descurtir(req, res)
})

// Verificar curtida
router.get('/vc/:fkUsuario/:fkPublicacao', (req, res) => {
    controller.verificarCurtida(req, res)
})

// Contar curtidas de publicação
router.get('/ccp/:fkPublicacao', (req, res) => {
    controller.contarCurtidasPub(req, res)
})

module.exports = router