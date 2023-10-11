const express = require('express')
const usuarioController = require('../controllers/usuarioController')
const router = express.Router()

router.get('/listar', (req, res) => {
    usuarioController.listarUsuarios(req, res)
})

module.exports = router