const db = require('../database/config')

function republicar(textoRepublicacao, fkUsuario, fkPublicacao) {
    return db.exec(`INSERT INTO Republicacao (textoRepublicacao, dataRepublicacao, fkUsuario, fkPublicacao) VALUES ('${textoRepublicacao}', now(), ${fkUsuario}, ${fkPublicacao})`)
}

module.exports = {
    republicar
}