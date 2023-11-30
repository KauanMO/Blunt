import { React, useEffect, useState } from "react"
import './Comentario.css'
import Imagem from "../imagem/Imagem"

function Comentario(comentario) {
    // c.idComentario, c.textoComentario, c.dataComentario, u.username, u.fotoPerfilUsuario, u.nomeExibicaoUsuario
    const [qtdCurtidas, setQtdCurtidas] = useState(null)
    const [curtido, setCurtido] = useState(null)

    useEffect(() => {
        const contarCurtidas = async () => {
            const curtidasRes = await fetch(`/curtidas/ccc/${comentario.comentario.idComentario}`)
            const qtdCurtidas = await curtidasRes.json()

            setQtdCurtidas(qtdCurtidas.curtidas)
        }
        contarCurtidas()

        const verificarCurtido = async () => {
            const verificarCurtidaRes = await fetch(`/curtidas/vc/${sessionStorage.getItem('idUsuario')}/${comentario.comentario.idComentario}/fkComentario`)
            const verificarCurtida = await verificarCurtidaRes.json()
            setCurtido(verificarCurtida)
        }
        verificarCurtido()
    }, [comentario.comentario.idComentario, curtido])

    const curtirDescurtir = async e => {
        try {
            fetch(`/curtidas/${curtido ? 'descurtir' : 'curtir'}`, {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    fkComentario: comentario.comentario.idComentario,
                    campo: 'fkComentario',
                    fkUsuario: sessionStorage.getItem('idUsuario')
                })
            })
            setCurtido(!curtido)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='comentario_container'>
            <Imagem src={comentario.comentario.fotoPerfilUsuario || comentario.comentario.fotoPerfilUsuarioComentario} className='foto_perfil_com w_3rem h_3rem' />
            <div>
                <div className='username_nomeExib_comentario'>
                    <span className='nome_exib_comentario'>{comentario.comentario.nomeExibicaoUsuario || comentario.comentario.nomeExibicaoUsuarioComentario}</span>
                    <span className='username_comentario'>@{comentario.comentario.username || comentario.comentario.usernameComentario}</span>
                </div>
                <span className='texto_comentario'>{comentario.comentario.textoComentario}</span>
                <div className='comentario_opcoes'>
                    <div onClick={curtirDescurtir} id={'curtir_' + comentario.comentario.idComentario} className='comentario_opcao'>
                        {qtdCurtidas}
                        <i className={curtido ? "fa-solid fa-heart bypass" : "fa-regular fa-heart bypass"}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comentario