const express = require('express')
const cors = require('cors')
const app = express()

const usuarioRoute = require('./routes/usuarioRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/usuarios', usuarioRoute)

app.listen(5000, () => { console.log('Servidor rodando') })