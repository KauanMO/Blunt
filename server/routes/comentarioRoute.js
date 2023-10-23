const express = require('express')
const controller = require('../controllers/comentarioController')
const router = express.Router()

router.post('/comentar', (req, res) => {
    controller.comentar(req, res)
})

module.exports = router