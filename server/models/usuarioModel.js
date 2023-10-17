const db = require('../database/config')

function listarUsuarios() {
    return db.exec('SELECT * FROM Usuario')
}

function cadastrarUsuario(username, email, senha, dataNasc, nomeExibicao) {
    return db.exec(`INSERT INTO Usuario (username, emailUsuario, senhaUsuario, dataNasc, nomeExibicaoUsuario) VALUES
    ('${username}', '${email}', '${senha}', '${dataNasc}', '${nomeExibicao}')`)
}

function buscarUsuarioPorCampo(campo, valor) {
    return db.exec(`SELECT idUsuario FROM Usuario WHERE ${campo} = '${valor}'`)
}

function atualizaUsuario(campo, valor, idUsuario) {
    return db.exec(`UPDATE Usuario SET ${campo} = '${valor}' WHERE idUsuario = ${idUsuario}`)
}

module.exports = {
    listarUsuarios,
    cadastrarUsuario,
    buscarUsuarioPorCampo,
    atualizaUsuario
}