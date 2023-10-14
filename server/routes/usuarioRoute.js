const express = require('express')
const controller = require('../controllers/usuarioController')
const router = express.Router()

router.get('/listar', (req, res) => {
    controller.listarUsuarios(req, res)
})

router.post('/cadastrar', (req, res) => {
    controller.cadastrarUsuario(req, res)
})

module.exports = router