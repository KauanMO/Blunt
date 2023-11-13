const model = require('../models/seguidorModel')

async function seguir(req, res) {
    try{
        await model.seguir(req.body.fkSeguidor, req.body.fkSeguido)
        res.status(200).end()
    }catch(e) {
        console.log(e)
        res.status(500).end()
    }
}

module.exports = {
    seguir
}