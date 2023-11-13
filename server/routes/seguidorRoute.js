const express = require('express')
const controller = require('../controllers/seguidorController')
const router = express.Router()
const token = require('../utils/token')

router.post('/seguir', token.autenticarToken, (req, res) => {
    controller.seguir(req, res)
})