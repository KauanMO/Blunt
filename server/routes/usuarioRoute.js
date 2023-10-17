const express = require('express')
const controller = require('../controllers/usuarioController')
const router = express.Router()

router.get('/listar', (req, res) => {
    controller.listarUsuarios(req, res)
})

// Buscar info usuario
router.get('/biu/:idUsuario', (req, res) => {
    controller.buscarInfoUsuario(req, res)
})

// Buscar foto usuario
router.get('/bfu/:idUsuario', (req, res) => {
    controller.buscarFotoUsuario(req, res)
})

router.get('/buscarUsuario/:campo/:valor', (req, res) => {
    controller.buscarUsuarioPorCampo(req, res)
})

router.post('/cadastrar', (req, res) => {
    controller.cadastrarUsuario(req, res)
})


module.exports = router