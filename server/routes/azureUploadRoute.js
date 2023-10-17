const express = require('express')
const router = express.Router()
const multer = require('multer')
const { BlobServiceClient } = require("@azure/storage-blob")
const usuarioModel = require('../models/usuarioModel')

const storage = multer.memoryStorage()
const upload = multer({ dest: 'uploads/', storage: storage })

const account = process.env.AZURE_STORAGE_ACCOUNT_NAME
const containerName = process.env.CONTAINER_NAME
const connStr = process.env.AZURE_KEY

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)

router.post('/uploadFotoUsuario/:idUsuario', upload.single('fotoUsuarioUpload'), async function (req, res, next) {
    const containerClient = blobServiceClient.getContainerClient(containerName)
    const blobName = new Date().getTime() + req.file.originalname

    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    const content = req.file.buffer

    blockBlobClient.upload(content, content.length)

    usuarioModel.atualizaUsuario('fotoPerfilUsuario', blockBlobClient.url, req.params.idUsuario)

    res.status(200)
})

module.exports = router