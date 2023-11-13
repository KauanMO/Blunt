const db = require('../database/config')

function comentar(textoComentario, fkPublicacao, fkUsuario) {
    return db.exec(`INSERT INTO Comentario (textoComentario, dataComentario, fkPublicacao, fkUsuario) VALUES ('${textoComentario}', now(), ${fkPublicacao}, '${fkUsuario}')`)
}

function listarComentariosPub(fkPublicacao) {
    return db.exec(`SELECT c.idComentario, c.textoComentario, c.dataComentario, u.username, u.fotoPerfilUsuario, u.nomeExibicaoUsuario
    from Comentario c JOIN Usuario u 
    ON c.fkUsuario = u.idUsuario 
    WHERE fkPublicacao = ${fkPublicacao}`)
}

function listarComentariosUsuario(fkUsuario) {
    return db.exec(`SELECT * FROM Comentario WHERE fkUsuario = '${fkUsuario}'`)
}

module.exports = {
    comentar,
    listarComentariosPub,
    listarComentariosUsuario
}