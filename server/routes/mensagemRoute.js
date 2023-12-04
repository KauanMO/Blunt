const express = require("express")
const router = express.Router()
const controller = require('../controllers/mensagemController')

// Mandar mensagem
router.post('/mm', (req, res) => controller.criarMensagem(req, res))

router.get('/buscarChat/:remetente/:destinatario', (req, res) => controller.buscarChat(req, res))

module.exports = router