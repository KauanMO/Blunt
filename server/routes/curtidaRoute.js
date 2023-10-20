const express = require('express')
const controller = require('../controllers/curtidaController')
const router = express.Router()

router.post('/curtir', (req, res) => {
    controller.curtir(req, res)
})

router.post('/descurtir', (req, res) => {
    controller.descurtir(req, res)
})

router.get('/vc/:fkUsuario/:fkPublicacao', (req, res) => {
    controller.verificarCurtida(req, res)
})

module.exports = router