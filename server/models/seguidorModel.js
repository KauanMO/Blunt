const db = require('../database/config')

function seguir(fkSeguidor, fkSeguido) {
    return db.exec(`INSERT INTO Seguidor(seguidor, seguido) VALUES ('${fkSeguidor}', '${fkSeguido}')`)
}

module.exports = {
    seguir   
}