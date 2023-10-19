const express = require('express')
const controller = require('../controllers/publicacaoController')
const router = express.Router()

router.post('/publicar', (req, res) => {
    controller.publicar(req, res)
})

router.get('/foryou', (req, res) => {
    controller.buscarFeedForYou(req,res)
})

module.exports = router