const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

const usuarioRoute = require('./routes/usuarioRoute')
const publicacaoRoute = require('./routes/publicacaoRoute')
const curtidaRoute = require('./routes/curtidaRoute')
const azureUploadRoute = require('./routes/azureUploadRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/usuarios', usuarioRoute)
app.use('/publicacoes', publicacaoRoute)
app.use('/curtidas', curtidaRoute)
app.use('/azureUpload', azureUploadRoute)

app.listen(5000, () => { console.log('Servidor rodando') })