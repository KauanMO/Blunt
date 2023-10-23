const express = require('express')
const controller = require('../controllers/republicacaoController')
const router = express.Router()

router.post('/republicar', (req, res) => {
    controller.republicar(req, res)
})

module.exports = router