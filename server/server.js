const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:3000' } })

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use('/usuarios', require('./routes/usuarioRoute'))
app.use('/publicacoes', require('./routes/publicacaoRoute'))
app.use('/republicacoes', require('./routes/republicacaoRoute'))
app.use('/curtidas', require('./routes/curtidaRoute'))
app.use('/seguidores', require('./routes/seguidorRoute'))
app.use('/comentarios', require('./routes/comentarioRoute'))
app.use('/azureUpload', require('./routes/azureUploadRoute'))
app.use('/f', require('./routes/fetchRoute'))
app.use('/mensagens', require('./routes/mensagemRoute'))

io.on('connection', socket => {
    console.log(`Usuário(${socket.id}) conectado.`)

    socket.on('setIdUsuario', idUsuario => {
        socket.data.idUsuario = idUsuario
    })

    socket.on('disconnect', reason => {
        console.log(`Usuario(${socket.id}) desconectado. Razão: ${reason}.`)
    })
})

require("mongoose").connect(process.env.MONGODB_MESSAGES_CONNECT)

server.listen(5000, () => { console.log('Servidor rodando') })