const express = require('express')
const controller = require('../controllers/comentarioController')
const router = express.Router()

router.post('/comentar', (req, res) => {
    controller.comentar(req, res)
})

// Listar comentários publicação
router.get('/lcp', (req, res) => {
    controller.listarComentariosPub(req, res)
})

module.exports = router