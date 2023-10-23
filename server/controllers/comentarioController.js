const model = require('../models/comentarioModel')

function comentar(req, res) {
    model.comentar(req.body.textoComentario, req.body.fkPublicacao, req.body.fkUsuario).then(result => {
        res.send(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function listarComentariosPub(req, res) {
    model.listarComentariosPub(req.params.fkPublicacao).then(result=>{
        res.send(result)
    }).catch(e=>{
        console.log(e)
        res.status(500).json
    })
}

module.exports = {
    comentar,
    listarComentariosPub
}