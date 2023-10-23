const db = require('../database/config')

function comentar(textoComentario, fkPublicacao, fkUsuario) {
    return db.exec(`INSERT INTO Comentario (textoComentario, dataComentario, fkPublicacao, fkUsuario) VALUES ('${textoComentario}', now(), ${fkPublicacao}, ${fkUsuario})`)
}

module.exports = {
    comentar
}