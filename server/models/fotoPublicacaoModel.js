const db = require('../database/config')

function cadastrarFoto(fkPublicacao, fotoPostagem) {
    db.exec(`INSERT INTO FotoPublicacao (fkPublicacao, fotoPostagem) VALUES (${fkPublicacao}, '${fotoPostagem}')`)
}

module.exports = {
    cadastrarFoto
}