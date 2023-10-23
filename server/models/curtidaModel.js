const db = require('../database/config')

function curtir(fkUsuario, fkPublicacao) {
    return db.exec(`INSERT INTO Curtida (fkUsuario, fkPublicacao) VALUES (${fkUsuario}, ${fkPublicacao})`)
}

function descurtir(fkUsuario, fkPublicacao) {
    return db.exec(`DELETE FROM Curtida WHERE fkUsuario = ${fkUsuario} AND fkPublicacao = ${fkPublicacao}`)
}

function verificarCurtida(fkUsuario, fkPublicacao) {
    return db.exec(`SELECT * FROM Curtida WHERE fkUsuario = ${fkUsuario} AND fkPublicacao = ${fkPublicacao}`)
}

function contarCurtidasPub(fkPublicacao) {
    return db.exec(`SELECT COUNT(idCurtida) as 'curtidas' FROM Curtida WHERE fkPublicacao = ${fkPublicacao}`)
}

module.exports = {
    curtir,
    descurtir,
    verificarCurtida,
    contarCurtidasPub
}