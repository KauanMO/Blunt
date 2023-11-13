const db = require('../database/config')

function curtir(fkUsuario, fk, campo) {
    return db.exec(`INSERT INTO Curtida (fkUsuario, ${campo}) VALUES ('${fkUsuario}', ${fk})`)
}

function descurtir(fkUsuario, fk, campo) {
    return db.exec(`DELETE FROM Curtida WHERE fkUsuario = '${fkUsuario}' AND ${campo} = ${fk}`)
}

function verificarCurtida(fkUsuario, fk, campo) {
    return db.exec(`SELECT * FROM Curtida WHERE fkUsuario = '${fkUsuario}' AND ${campo} = ${fk}`)
}

function contarCurtidasPub(fkPublicacao) {
    return db.exec(`SELECT COUNT(idCurtida) as 'curtidas' FROM Curtida WHERE fkPublicacao = ${fkPublicacao}`)
}

function contarCurtidasCom(fkComentario) {
    return db.exec(`SELECT COUNT(idCurtida) as 'curtidas' FROM Curtida WHERE fkComentario = ${fkComentario}`)
}

module.exports = {
    curtir,
    descurtir,
    verificarCurtida,
    contarCurtidasPub,
    contarCurtidasCom
}