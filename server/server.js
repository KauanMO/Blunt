const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:3000' } })

require('dotenv').config()

const usuarioRoute = require('./routes/usuarioRoute')
const publicacaoRoute = require('./routes/publicacaoRoute')
const republicacaoRoute = require('./routes/republicacaoRoute')
const curtidaRoute = require('./routes/curtidaRoute')
const seguidorRoute = require('./routes/seguidorRoute')
const comentarioRoute = require('./routes/comentarioRoute')
const azureUploadRoute = require('./routes/azureUploadRoute')
const fetchRoute = require('./routes/fetchRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use('/usuarios', usuarioRoute)
app.use('/publicacoes', publicacaoRoute)
app.use('/republicacoes', republicacaoRoute)
app.use('/curtidas', curtidaRoute)
app.use('/seguidores', seguidorRoute)
app.use('/comentarios', comentarioRoute)
app.use('/azureUpload', azureUploadRoute)
app.use('/f', fetchRoute)

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)
})

server.listen(5000, () => { console.log('Servidor rodando') })