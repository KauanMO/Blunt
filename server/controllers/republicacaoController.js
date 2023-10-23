const model = require('../models/republicacaoModel')

function republicar(req, res) {
    model.republicar(req.body.textoRepublicacao, req.body.fkUsuario, req.body.fkPublicacao).then(result=>{
        res.send(result)
    }).catch(e=>{
        console.log(e)
        res.status(500).json
    })
}

module.exports = {
    republicar
}