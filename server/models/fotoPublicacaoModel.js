const db = require('../database/config')

function cadastrarFoto(fkPublicacao, fotoPublicacao) {
    db.exec(`INSERT INTO FotoPublicacao (fkPublicacao, fotoPublicacao) VALUES (${fkPublicacao}, '${fotoPublicacao}')`)
}

module.exports = {
    cadastrarFoto
}