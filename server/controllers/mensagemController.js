const Mensagem = require("../models/mensagemModel")

const criarMensagem = async (req, res) => {
    try {
        const newMensagem = new Mensagem({ remetente: req.body.remetente, destinatario: req.body.destinatario, mensagem: req.body.mensagem })
        await newMensagem.save()
        res.status(200).send('Mensagem enviada com sucesso')
    } catch (e) {
        console.log(e)
        res.status(500).send({ clientMessage: 'Erro ao mandar mensagem', serverMessage: `Erro ao mandar mensagem: ${e}` })
    }
}

const buscarChat = async (req, res) => {
    try {
        const mensagens = await Mensagem.find({ remetente: req.params.usuario1, destinatario: req.params.usuario2 }).exec()
        res.send(mensagens)
    } catch (e) {
        console.log(e)
        res.status(500).send({ clientMessage: 'Erro ao buscar mensagens', serverMessage: `Erro ao buscar mensagens: ${e}` })
    }
}

module.exports = {
    criarMensagem,
    buscarChat
}