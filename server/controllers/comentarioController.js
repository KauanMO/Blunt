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

async function listarComentariosUsuario(req,res) {
    try{
        const results = await model.listarComentariosUsuario(req.params.fkUsuario)
        res.send(results)
    }catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
}

module.exports = {
    comentar,
    listarComentariosPub,
    listarComentariosUsuario
}