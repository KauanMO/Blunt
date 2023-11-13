const express = require('express')
const controller = require('../controllers/comentarioController')
const router = express.Router()

router.post('/comentar', (req, res) => {
    controller.comentar(req, res)
})

// Listar comentários publicação
router.get('/lcp/:fkPublicacao', (req, res) => {
    controller.listarComentariosPub(req, res)
})

// Listar comentários por usuário
router.get('/lcu/:fkUsuario', (req, res) => {
    controller.listarComentariosUsuario(req, res)
})

module.exports = router