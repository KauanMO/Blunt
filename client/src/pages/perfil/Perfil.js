import React, { useState, useEffect } from 'react'
import styles from './Perfil.module.css'
import Imagem from '../../components/imagem/Imagem'
import Navbar from '../../components/navbar/Navbar'
import Rightside from '../../components/rightside/Rightside'
import Button from '../../components/button/Button'
import Publicacao from '../../components/publicacao/Publicacao'

function Perfil() {
    // infoUsuario = bioUsuario, dataCadastro, fotoCapaUsuario, fotoPerfilUsuario, idUsuario, nomeExibicaoUsuario, username
    const [infoUsuario, setInfoUsuario] = useState({
        idUsuario: '',
        username: '',
        nomeExibicaoUsuario: '',
        fotoCapaUsuario: '',
        fotoPerfilUsuario: '',
        bioUsuario: ''
    })

    const [pubsUsuario, setPubsUsuario] = useState([])

    const [meuPerfil, setMeuPerfil] = useState(false)

    useEffect(() => {
        const fetchDataInfoUsuario = async () => {
            try {
                const response = await fetch(`http://localhost:5000/usuarios/biuu/${window.location.href.split('/')[3]}`)
                const infoUsuarioRes = await response.json()
                setInfoUsuario(infoUsuarioRes[0])
            } catch (e) {
                console.log(e)
            }
        }

        const fetchPublicacoesUsuario = async () => {
            if (!infoUsuario.idUsuario) { return }
            try {
                const response = await fetch(`http://localhost:5000/publicacoes/bpu/${infoUsuario.idUsuario}`)
                const pubsUsuarioRes = await response.json()
                setPubsUsuario(pubsUsuarioRes)
            } catch (e) {
                console.log(e)
            }

        }

        if (infoUsuario.idUsuario === Number(sessionStorage.getItem('idUsuario'))) { setMeuPerfil(true) }
        fetchDataInfoUsuario()
        fetchPublicacoesUsuario()
    }, [infoUsuario.idUsuario])

    function animacaoUnderlineOpcaoNavegacao(opcao) {
        const opcoesNavegacaoPerfil = document.querySelector('#opcoes_navegacao_perfil')

        switch (opcao) {
            case 'publicacoes':
                opcoesNavegacaoPerfil.querySelector('#underline_publicacoes').style.width = '5.2rem'
                opcoesNavegacaoPerfil.querySelector('#underline_curtidas').style.width = '0'
                opcoesNavegacaoPerfil.querySelector('#underline_comentarios').style.width = '0'
                break
            case 'curtidas':
                opcoesNavegacaoPerfil.querySelector('#underline_publicacoes').style.width = '0'
                opcoesNavegacaoPerfil.querySelector('#underline_curtidas').style.width = '3.6rem'
                opcoesNavegacaoPerfil.querySelector('#underline_comentarios').style.width = '0'
                break
            case 'comentarios':
                opcoesNavegacaoPerfil.querySelector('#underline_publicacoes').style.width = '0'
                opcoesNavegacaoPerfil.querySelector('#underline_curtidas').style.width = '0'
                opcoesNavegacaoPerfil.querySelector('#underline_comentarios').style.width = '5.5rem'
                break
            default:
                break
        }
    }

    function mudarConteudoCentral(conteudo) {
        const centralAtivo = document.querySelector('#conteudo_central').querySelector("[centralativo='true']")
        if (centralAtivo.id.split('_')[1] !== conteudo) {
            centralAtivo.setAttribute("centralativo", "false")
            centralAtivo.style.animation = `${styles.conteudoCentralOut} 150ms forwards`
        }

        switch (conteudo) {
            case 'publicacoes':
                document.querySelector('#central_publicacoes').style.animation = `${styles.conteudoCentralIn} 150ms forwards`
                document.querySelector('#central_publicacoes').setAttribute("centralativo", "true")
                break
            case 'curtidas':
                document.querySelector('#central_curtidas').style.animation = `${styles.conteudoCentralIn} 150ms forwards`
                document.querySelector('#central_curtidas').setAttribute("centralativo", "true")
                break
            case 'comentarios':
                document.querySelector('#central_comentarios').style.animation = `${styles.conteudoCentralIn} 150ms forwards`
                document.querySelector('#central_comentarios').setAttribute("centralativo", "true")
                break
            default:
                break
        }
    }

    const mudarOpcaoNavegacao = e => {
        animacaoUnderlineOpcaoNavegacao(e.target.id)
        mudarConteudoCentral(e.target.id)
    }

    return (
        <div className={styles.perfil_container}>
            <Navbar />
            <div className={styles.perfil_central}>
                <div className={styles.imagem_capa_perfil}>
                    <Imagem src={infoUsuario.fotoCapaUsuario ? infoUsuario.fotoCapaUsuario : ''} />
                </div>
                <div className={styles.perfil_info}>
                    <div className={styles.perfil_header}>
                        <Imagem imageClassName='foto_perfil_perfil' src={infoUsuario.fotoPerfilUsuario} />
                        <div className={styles.textos_header}>
                            <div className={styles.nomes_header}>
                                <span className={styles.username_header}>{infoUsuario.username}</span>
                                <span className={styles.nomeExib_header}>@{infoUsuario.nomeExibicaoUsuario}</span>
                            </div>
                            <div className={styles.bio_header}>
                                {infoUsuario.bioUsuario ? infoUsuario.bioUsuario : meuPerfil ? 'Informe mais sobre você' : ''}
                                {meuPerfil ? <i style={{ cursor: 'pointer' }} className="fa-regular fa-pen-to-square"></i> : ''}
                            </div>
                            <div className={styles.seguidores_header}>
                                <span className={styles.seguidores}>0 seguidores</span>
                                <span className={styles.seguindo}>0 seguindo</span>
                            </div>
                        </div>
                    </div>
                    <Button text={meuPerfil ? 'Editar perfil' : 'Seguir'} />
                </div>

                <div id='opcoes_navegacao_perfil' className={styles.opcoes_navegacao_perfil}>
                    <span id='publicacoes' onClick={mudarOpcaoNavegacao}>
                        Publicações
                        <div id='underline_publicacoes' className={styles.underline_publicacoes_perfil}></div>
                    </span>
                    <span id='curtidas' onClick={mudarOpcaoNavegacao}>
                        Curtidas
                        <div id='underline_curtidas' className={styles.underline_curtidas_perfil}></div>
                    </span>
                    <span id='comentarios' onClick={mudarOpcaoNavegacao}>
                        Comentários
                        <div id='underline_comentarios' className={styles.underline_comentarios_perfil}></div>
                    </span>
                </div>

                <div id='conteudo_central' className={styles.conteudo_central}>
                    <div centralativo='true' id='central_publicacoes' className={styles.publicacoes_usuario}>
                        {pubsUsuario[0] ?
                            pubsUsuario.map((post, i) => {
                                return (<Publicacao key={i} pubInfo={post} />)
                            })
                            : 'Carregando publicações...'}
                    </div>
                    <div centralativo='false' id='central_curtidas' className={styles.curtidas_usuario}>

                    </div>
                    <div centralativo='false' id='central_comentarios' className={styles.comentarios_usuario}>

                    </div>
                </div>
            </div>
            <Rightside />
        </div>
    )
}

export default Perfil