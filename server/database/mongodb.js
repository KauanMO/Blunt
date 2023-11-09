const mongoose = require('mongoose')
const date = require('dayjs')

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.efwxh13.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`)

const Token = mongoose.model("Token", {
    token: {
        type: String,
        required: true
    },
    idUsuario: {
        type: String,
        required: true
    },
    expiresIn: {
        type: Number,
        required: true
    }
})

const criarRefreshToken = async (tokenHash, idUsuario, expires) => {
    const newToken = new Token({ token: tokenHash, idUsuario: idUsuario, expiresIn: expires })

    await newToken.save()
}

const atualizarRefreshToken = async (tokenHash, idUsuario, expires) => {
    let res = await Token.find({ idUsuario: idUsuario })

    if (res[0].expiresIn <= date().unix()) {
        await Token.updateOne({ idUsuario: idUsuario }, { token: tokenHash, expiresIn: expires })
    }
}

const buscarRefreshToken = async (idUsuario) => {
    let res = await Token.find({ idUsuario: idUsuario })

    return res.length > 0
}

module.exports = {
    criarRefreshToken,
    atualizarRefreshToken,
    buscarRefreshToken
}