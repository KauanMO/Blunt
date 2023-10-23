const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

const usuarioRoute = require('./routes/usuarioRoute')
const publicacaoRoute = require('./routes/publicacaoRoute')
const curtidaRoute = require('./routes/curtidaRoute')
const comentarioRoute = require('./routes/comentarioRoute')
const azureUploadRoute = require('./routes/azureUploadRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/usuarios', usuarioRoute)
app.use('/publicacoes', publicacaoRoute)
app.use('/curtidas', curtidaRoute)
app.use('/comentarios', comentarioRoute)
app.use('/azureUpload', azureUploadRoute)

app.listen(5000, () => { console.log('Servidor rodando') })