const express = require('express')
const app = express()
const usuarioRoute = require('./routes/usuarioRoute')

app.use('/usuarios', usuarioRoute)

app.listen(5000, () => { console.log('Servidor rodando') })