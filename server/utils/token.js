const jwt = require('jsonwebtoken')
const { createHmac } = require('crypto')
const db = require('../database/mongodb')
const date = require('dayjs')

async function criarToken(idUsuario) {
    let expires = date().add(30, "second").unix()
    return jwt.sign({ idUsuario: idUsuario }, process.env.JWT_SECRET, {
        expiresIn: expires,
    })
}

async function localizarCriarRefreshToken(idUsuario) {
    let expires = date().add(30, "day").unix()

    const token = jwt.sign({ idUsuario: idUsuario }, process.env.JWT_SECRET, {
        expiresIn: expires
    })
    const tokenHash = createHmac('sha512', process.env.JWT_SECRET).update(token).digest('hex')

    const existeRefreshToken = await db.buscarRefreshToken(idUsuario)

    try {
        existeRefreshToken
            ? db.atualizarRefreshToken(tokenHash, idUsuario, expires)
            : localizarCriarRefreshToken(tokenHash, idUsuario, expires)
    } catch (e) {
        console.log(e)
    }

    setTimeout(() => {
        localizarCriarRefreshToken(idUsuario)
    }, 15000)

    return await criarToken(idUsuario)
}

function autenticarToken(req, res, next) {
    const token = req.headers['token_auth']

    if (token == null) return res.status(401).end()

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).end()

        req.idUsuario = decoded.idUsuario
        next()
    })
}

function setRefreshCookie(res, token) {
    res.cookie('refresh-token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date.now().addDays(30)
    })
}

module.exports = {
    criarToken,
    autenticarToken,
    localizarCriarRefreshToken,
    setRefreshCookie
}