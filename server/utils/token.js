const jwt = require('jsonwebtoken')
const { createHmac } = require('crypto')
const db = require('../database/mongodb')
const date = require('dayjs')

function criarToken(idUsuario) {
    return jwt.sign({ idUsuario: idUsuario }, process.env.JWT_SECRET, {
        expiresIn: '30s',
        audience: 'urn:jwt:type:access',
        issuer: 'urn:system:token-issuer:type:access'
    })
}

async function criarRefreshToken(idUsuario) {
    let expires = date().add(30, "day").unix()

    const token = jwt.sign({ idUsuario: idUsuario }, process.env.JWT_SECRET, {
        expiresIn: expires,
        audience: 'urn:jwt:type:access',
        issuer: 'urn:system:token-issuer:type:access'
    })
    const tokenHash = createHmac('sha512', process.env.JWT_SECRET).update(token).digest('hex')

    const exiteRefreshToken = await db.buscarRefreshToken(idUsuario)

    try {
        exiteRefreshToken
            ? db.atualizarRefreshToken(tokenHash, idUsuario, expires)
            : db.criarRefreshToken(tokenHash, idUsuario, expires)
    } catch (e) {
        console.log(e)
    }

    setTimeout(() => {
        criarRefreshToken(idUsuario)
    }, 15000)
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
    criarRefreshToken,
    setRefreshCookie
}