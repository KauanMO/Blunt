const model = require('../models/publicacaoModel')

function publicar(req, res) {
    model.publicar(req.body.textoUsuarioServer, req.body.fkUsuarioServer).then(result=>{
        res.send(result)
    })
}

module.exports = {
    publicar
}