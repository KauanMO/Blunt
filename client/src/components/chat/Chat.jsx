import React, { useEffect } from "react"
import './Chat.css'

function Chat({ usuarioAtual }) {
    const SemChatAtivo = () => {
        return (
            <div className={'sem_chat_ativo_container'}>
                Sem chat ativo
            </div>
        )
    }
    useEffect(() => {
async function buscarMensagensChatAtual(){
    const resMensagens = await fetch(`/mensagens/buscarMensagem/${sessionStorage.getItem('')}`)
}
    }, [usuarioAtual])


    return (
        <div className={'chat_container'}>
            {
                usuarioAtual
                    ? usuarioAtual
                    : <SemChatAtivo />
            }
        </div>
    )
}

export default Chat