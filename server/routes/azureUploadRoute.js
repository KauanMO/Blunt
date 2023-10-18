const express = require('express')
const router = express.Router()
const multer = require('multer')
const { BlobServiceClient } = require("@azure/storage-blob")
const usuarioModel = require('../models/usuarioModel')
const fotoPublicacaoModel = require('../models/fotoPublicacaoModel')

const storage = multer.memoryStorage()
const upload = multer({ dest: 'uploads/', storage: storage })

const account = process.env.AZURE_STORAGE_ACCOUNT_NAME
const containerName = process.env.CONTAINER_NAME
const connStr = process.env.AZURE_KEY

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)

router.post('/uploadFotoUsuario/:idUsuario', upload.single('fotoUsuarioUpload'), async function (req, res) {
    const containerClient = blobServiceClient.getContainerClient(containerName)
    const blobName = new Date().getTime() + req.file.originalname

    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    const content = req.file.buffer

    blockBlobClient.upload(content, content.length)

    usuarioModel.atualizarUsuario('fotoPerfilUsuario', blockBlobClient.url, req.params.idUsuario)

    res.status(200)
})

router.post('/uploadFotoPub/:idPub', upload.single('fotoPublicacaoUpload'), async function (req, res) {
    const containerClient = blobServiceClient.getContainerClient(containerName)
    const blobName = new Date().getTime() + req.file.originalname

    console.log(req.file)

    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    const content = req.file.buffer

    blockBlobClient.upload(content, content.length)

    fotoPublicacaoModel.cadastrarFoto(req.params.idPub, blockBlobClient.url)
    res.status(200)
})

module.exports = router