const mongoose = require("mongoose")
const { Schema } = mongoose;

const mensagemSchema = new Schema({
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

const mensagem = mongoose.model("Mensagem", mensagemSchema)

module.exports = mensagem