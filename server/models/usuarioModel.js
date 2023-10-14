const db = require('../database/config')

function listarUsuarios() {
    return db.exec('SELECT * FROM Usuario')
}

function cadastrarUsuario(username, email, senha, nomeExibicao) {
    return db.exec(`INSERT INTO Usuario (username, emailUsuario, senhaUsuario, nomeExibicaoUsuario) VALUES
    '${username}', '${email}', '${senha}', '${nomeExibicao}'`)
}

module.exports = {
    listarUsuarios,
    cadastrarUsuario
}