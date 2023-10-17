const db = require('../database/config')

function listarUsuarios() {
    return db.exec('SELECT * FROM Usuario')
}

function buscarInfoUsuario(idUsuario) {
    return db.exec(`SELECT username, nomeExibicaoUsuario, bioUsuario, dataNasc, dataCadastro FROM Usuario WHERE idUsuario = ${idUsuario}`)
}

function buscarFotoUsuario(idUsuario) {
    return db.exec(`SELECT fotoPerfilUsuario from Usuario WHERE idUsuario = ${idUsuario}`)
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
    buscarInfoUsuario,
    buscarFotoUsuario,
    cadastrarUsuario,
    buscarUsuarioPorCampo,
    atualizaUsuario
}