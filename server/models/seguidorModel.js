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

module.exports = {
    seguir,
    deixarDeSeguir,
    buscarSeguidor
}