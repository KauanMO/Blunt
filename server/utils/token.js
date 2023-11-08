const jwt = require('jsonwebtoken')

function criarToken(idUsuario) {
    return jwt.sign({ idUsuario: idUsuario }, process.env.JWT_SECRET, {})
}

function autenticarToken(req, res, next) {
    const token = req.headers['token-auth']

    if (token == null) return res.status(401).end()

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(401).end()

        req.idUsuario = decoded.idUsuario
        next()
    })
}

module.exports = {
    criarToken,
    autenticarToken
}