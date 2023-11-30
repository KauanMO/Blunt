const db = require('../database/config')

function seguir(fkSeguidor, fkSeguido) {
    return db.exec(`INSERT INTO Seguidor(seguidor, seguido) VALUES ('${fkSeguidor}', '${fkSeguido}')`)
}

function deixarDeSeguir(fkSeguidor, fkSeguido) {
    return db.exec(`DELETE FROM Seguidor WHERE seguidor = '${fkSeguidor}' AND seguido = '${fkSeguido}'`)
}

function buscarSeguidor(fkSeguidor, fkSeguido) {
    return db.exec(`SELECT * FROM Seguidor WHERE seguidor = '${fkSeguidor}' AND seguido = '${fkSeguido}'`)
}

function buscarQuantidadeSeguidores(fkSeguido) {
    return db.exec(`SELECT COUNT(idSeguidor) AS qtdSeguidores FROM Seguidor WHERE seguido = '${fkSeguido}'`)
}

function buscarInfoSeguidores(fkSeguido) {
    return db.exec(`SELECT s.notificar, s.seguidor, s.seguido,
    u.idUsuario, u.username, u.fotoPerfilUsuario, u.nomeExibicaoUsuario
    FROM Seguidor s
    JOIN Usuario u ON s.seguidor = u.idUsuario
    WHERE s.seguido = '${fkSeguido}'`)
}

function buscarQuantidadeSeguindo(fkSeguidor) {
    return db.exec(`SELECT COUNT(idSeguidor) AS qtdSeguindo FROM Seguidor WHERE seguidor = '${fkSeguidor}'`)
}

function buscarInfoSeguindo(fkSeguidor) {
    return db.exec(`SELECT s.notificar, s.seguidor, s.seguido,
    u.idUsuario, u.username, u.fotoPerfilUsuario, u.nomeExibicaoUsuario
    FROM Seguidor s
    JOIN Usuario u ON s.seguidor = u.idUsuario
    WHERE s.seguidor = '${fkSeguidor}'`)
}

function buscarSeguidoresReciprocos(fkUsuario) {
    return db.exec(`SELECT s.seguido as seguidor,
	u.username, u.fotoPerfilUsuario, u.nomeExibicaoUsuario
    FROM seguidor s
    JOIN Usuario u ON s.seguido = u.idUsuario
    WHERE seguidor = '${fkUsuario}' 
    AND seguido IN (SELECT seguidor FROM seguidor WHERE seguido = '${fkUsuario}')`)
}

module.exports = {
    seguir,
    deixarDeSeguir,
    buscarSeguidor,
    buscarQuantidadeSeguidores,
    buscarInfoSeguidores,
    buscarQuantidadeSeguindo,
    buscarInfoSeguindo,
    buscarSeguidoresReciprocos
}