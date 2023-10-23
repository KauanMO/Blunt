const db = require('../database/config')

function listarUsuarios() {
    return db.exec('SELECT * FROM Usuario')
}

function buscarInfoUsuario(idUsuario) {
    return db.exec(`SELECT username, nomeExibicaoUsuario, bioUsuario, dataNasc, dataCadastro FROM Usuario WHERE idUsuario = ${idUsuario}`)
}

function buscarInfoUsuarioUsername(username) {
    return db.exec(`SELECT idUsuario, username, fotoPerfilUsuario, nomeExibicaoUsuario, bioUsuario, dataCadastro FROM Usuario WHERE username = '${username}'`)
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

function atualizarUsuario(campo, valor, idUsuario) {
    return db.exec(`UPDATE Usuario SET ${campo} = '${valor}' WHERE idUsuario = ${idUsuario}`)
}

function login(emailUsername, senha) {
    return db.exec(`SELECT idUsuario, username FROM Usuario WHERE username = '${emailUsername}' or emailUsuario = '${emailUsername}' and senhaUsuario = '${senha}'`)
}

function deletar(idUsuario, senha) {
    return db.exec(`DELETE FROM Usuario WHERE idUsuario = ${idUsuario} AND senhaUsuario = '${senha}'`)
}

module.exports = {
    listarUsuarios,
    buscarInfoUsuario,
    buscarInfoUsuarioUsername,
    buscarFotoUsuario,
    cadastrarUsuario,
    buscarUsuarioPorCampo,
    atualizarUsuario,
    login,
    deletar
}