const mongoose = require("mongoose")

const mensagem = mongoose.model("Mensagem", {
    remetente: {
        type: String,
        required: true
    },
    destinatario: {
        type: String,
        required: true
    },
    mensagem: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true,
        default: Date.now
    },
    vizualizado: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Mensagem", mensagem)