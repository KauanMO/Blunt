const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/', storage: storage })

const account = process.env.AZURE_STORAGE_ACCOUNT_NAME
const containerName = process.env.CONTAINER_NAME
const connStr = process.env.AZURE_KEY

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

router.post('/', upload.single('imageToUpload'), async function (req, res, next) {
    const containerClient = blobServiceClient.getContainerClient(containerName)
    const blobName = new Date().getTime() + req.file.originalname

    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    const content = req.file.buffer

    const uploadBlobResponse = blockBlobClient.upload(content, content.length)

    console.log(blockBlobClient.url)
    res.status(200).send('Upload bem sucedido')
})

module.exports = router