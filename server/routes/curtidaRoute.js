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
router.get('/vc/:fkUsuario/:fk/:campo', (req, res) => {
    controller.verificarCurtida(req, res)
})

// Contar curtidas de publicação
router.get('/ccp/:fkPublicacao', (req, res) => {
    controller.contarCurtidasPub(req, res)
})

// Contar curtidas de comentário
router.get('/ccc/:fkComentario', (req, res) => {
    controller.contarCurtidasCom(req, res)
})

module.exports = router