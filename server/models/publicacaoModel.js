const db = require('../database/config')

function publicar(textoPublicacao, fkUsuario) {
    return db.exec(`INSERT INTO Publicacao (textoPublicacao, dataPublicacao, fkUsuario) VALUES ('${textoPublicacao}', now(), ${fkUsuario})`)
}

function buscarFeedForYou() {
    return db.exec(`SELECT p.idPublicacao, p.textoPublicacao, p.dataPublicacao, fp.fotoPublicacao, u.username, 
    u.fotoPerfilUsuario, u.nomeExibicaoUsuario
        FROM Publicacao p
        LEFT JOIN fotoPublicacao fp ON fp.fkPublicacao = p.idPublicacao
        JOIN Usuario u ON p.fkUsuario = u.idUsuario
        ORDER BY dataPublicacao DESC`)
}

function buscarPublicacoesUsuario(idUsuario) {
    return db.exec(`SELECT p.idPublicacao, p.textoPublicacao, p.dataPublicacao, fp.fotoPublicacao, u.username, 
    u.fotoPerfilUsuario, u.nomeExibicaoUsuario
        FROM Publicacao p
        LEFT JOIN fotoPublicacao fp ON fp.fkPublicacao = p.idPublicacao
        JOIN Usuario u ON p.fkUsuario = u.idUsuario
        WHERE p.fkUsuario = ${idUsuario}
        ORDER BY dataPublicacao DESC`)
}

function buscarPublicacoesCurtidasUsuario(idUsuario) {
    return db.exec(`SELECT p.idPublicacao, p.textoPublicacao, p.dataPublicacao, fp.fotoPublicacao, u.username, 
    u.fotoPerfilUsuario, u.nomeExibicaoUsuario
        FROM Publicacao p
        LEFT JOIN fotoPublicacao fp ON fp.fkPublicacao = p.idPublicacao
        JOIN Usuario u ON p.fkUsuario = u.idUsuario
        AND p.idPublicacao IN (SELECT fkPublicacao FROM Curtida WHERE fkUsuario = ${idUsuario})
        ORDER BY dataPublicacao DESC`)
}

module.exports = {
    publicar,
    buscarFeedForYou,
    buscarPublicacoesUsuario,
    buscarPublicacoesCurtidasUsuario
}