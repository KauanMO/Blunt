const db = require('../database/config')

function comentar(textoComentario, fkPublicacao, fkUsuario) {
    return db.exec(`INSERT INTO Comentario (textoComentario, dataComentario, fkPublicacao, fkUsuario) VALUES ('${textoComentario}', now(), ${fkPublicacao}, '${fkUsuario}')`)
}

function listarComentariosPub(fkPublicacao) {
    return db.exec(`SELECT c.idComentario, c.textoComentario, c.dataComentario, 
    u.username, u.fotoPerfilUsuario, u.nomeExibicaoUsuario
    FROM Comentario c 
    JOIN Usuario u ON c.fkUsuario = u.idUsuario 
    WHERE fkPublicacao = ${fkPublicacao}`)
}

function listarComentariosUsuario(fkUsuario) {
    return db.exec(`SELECT c.idComentario, c.textoComentario, c.dataComentario, c.fkPublicacao, c.fkUsuario as idUsuarioComentario,
    u.username as usernameComentario, u.fotoPerfilUsuario as fotoPerfilUsuarioComentario, u.nomeExibicaoUsuario as nomeExibicaoUsuarioComentario,
    p.idPublicacao, p.nanoId, p.textoPublicacao, p.dataPublicacao, fp.fotoPublicacao,
    up.username as usernamePublicacao, up.fotoPerfilUsuario as fotoPerfilUsuarioPublicacao, up.nomeExibicaoUsuario as nomeExibicaoUsuarioPublicacao
    FROM Comentario c
    JOIN Usuario u ON c.fkUsuario = u.idUsuario
    JOIN Publicacao p ON c.fkPublicacao = p.idPublicacao
    JOIN Usuario up ON p.fkUsuario = up.idUsuario
    LEFT JOIN FotoPublicacao fp ON fp.fkPublicacao = p.idPublicacao
    WHERE c.fkUsuario = '${fkUsuario}'`)
}

module.exports = {
    comentar,
    listarComentariosPub,
    listarComentariosUsuario
}