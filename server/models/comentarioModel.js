const db = require('../database/config')

function comentar(textoComentario, fkPublicacao, fkUsuario) {
    return db.exec(`INSERT INTO Comentario (textoComentario, dataComentario, fkPublicacao, fkUsuario) VALUES ('${textoComentario}', now(), ${fkPublicacao}, ${fkUsuario})`)
}

function listarComentariosPub(fkPublicacao) {
    return db.exec(`SELECT * from Comentario WHERE fkPublicacao = ${fkPublicacao}`)
}

module.exports = {
    comentar,
    listarComentariosPub
}