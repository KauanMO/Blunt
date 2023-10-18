const db = require('../database/config')
const fotoPublicacaoModel = require('./fotoPublicacaoModel')

function publicar(textoPublicacao, fkUsuario) {
    return db.exec(`INSERT INTO Publicacao(textoPublicacao, dataPublicacao, fkUsuario) VALUES ('${textoPublicacao}', now(), ${fkUsuario})`)
}

module.exports = {
    publicar
}