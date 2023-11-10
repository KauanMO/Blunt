const express = require('express')
const controller = require('../controllers/usuarioController')
const router = express.Router()
const token = require('../utils/token')

router.get('/listar', (req, res) => {
    controller.listarUsuarios(req, res)
})

// Buscar info usuario
router.get('/biu/:idUsuario', token.autenticarToken, (req, res) => {
    controller.buscarInfoUsuario(req, res)
})

// Buscar info usuario por username
router.get('/biuu/:username', (req, res) => {
    controller.buscarInfoUsuarioUsername(req, res)
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

router.post('/login', (req, res) => {
    controller.login(req, res)
})

router.delete('/deletar/:idUsuario/:senha', token.autenticarToken, (req, res) => {
    controller.deletar(req, res)
})

module.exports = router