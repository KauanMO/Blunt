import React, { useState, useEffect } from 'react'
import styles from './Perfil.module.css'
import Imagem from '../../components/imagem/Imagem'
import FotoCapaPerfil from '../../components/fotoCapaPerfil/FotoCapaPerfil'
import Navbar from '../../components/navbar/Navbar'
import Rightside from '../../components/rightside/Rightside'
import Button from '../../components/button/Button'
import Publicacao from '../../components/publicacao/Publicacao'
import Comentario from '../../components/comentario/Comentario'
import Modal from '../../components/modal/Modal'
import Input from '../../components/input/Input'
import TextArea from '../../components/textArea/TextArea'

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
    const [curtidasUsuario, setCurtidasUsuario] = useState([])
    const [comentariosUsuario, setComentariosUsuario] = useState([])
    const [meuPerfil, setMeuPerfil] = useState(false)

    useEffect(() => {
        const fetchDataInfoUsuario = async () => {
            try {
                const response = await fetch(`http://localhost:5000/usuarios/biuu/${window.location.href.split('/')[3]}`, { headers: { auth_token: localStorage.getItem('jwt') } })
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

        const fetchCurtidasUsuario = async () => {
            if (!infoUsuario.idUsuario) { return }
            try {
                const response = await fetch(`http://localhost:5000/publicacoes/bpcu/${infoUsuario.idUsuario}`)
                const curtidasUsuarioRes = await response.json()
                setCurtidasUsuario(curtidasUsuarioRes)
            } catch (e) {
                console.log(e)
            }
        }

        const fetchComentariosUsuario = async () => {
            if (!infoUsuario.idUsuario) { return }
            try {
                const comentariosUsuarioRes = await fetch(`http://localhost:5000/comentarios/lcu/${infoUsuario.idUsuario}`)
                const comentariosUsuario = await comentariosUsuarioRes.json()
                setComentariosUsuario(comentariosUsuario)
            } catch (e) {
                console.log(e)
            }
        }

        if (infoUsuario.idUsuario === sessionStorage.getItem('idUsuario')) { setMeuPerfil(true) }

        fetchDataInfoUsuario()
        fetchPublicacoesUsuario()
        fetchComentariosUsuario()
        fetchCurtidasUsuario()
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
                document.querySelector('#central_curtidas').style.display = 'flex'
                document.querySelector('#central_publicacoes').style.animation = `${styles.conteudoCentralIn} 150ms forwards`
                document.querySelector('#central_publicacoes').setAttribute("centralativo", "true")
                break
            case 'curtidas':
                document.querySelector('#central_curtidas').style.display = 'flex'
                document.querySelector('#central_curtidas').style.animation = `${styles.conteudoCentralIn} 150ms forwards`
                document.querySelector('#central_curtidas').setAttribute("centralativo", "true")
                break
            case 'comentarios':
                document.querySelector('#central_curtidas').style.display = 'flex'
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

    const seguir = () => {
    }

    const buscarInfoEditar = async () => {
        try {
            const infoUsuarioRes = await fetch(`http://localhost:5000/usuarios/biu/${sessionStorage.getItem('idUsuario')}`, { headers: { token_auth: localStorage.getItem('jwt') } })
            const infoUsuario = await infoUsuarioRes.json()
            document.querySelector('#editar_nome_usuario').value = infoUsuario.username
            document.querySelector('#editar_nome_exibicao').value = infoUsuario.nomeExibicaoUsuario
        } catch (e) {
            console.log(e)
        }
    }
    const EditarPerfil = () => {
        return (
            <div>
                <Input name={'editar_nome_usuario'} className={'editar_perfil'} labelColor='white' label={'Nome de usuário'} />
                <Input name={'editar_nome_exibicao'} className={'editar_perfil'} labelColor='white' label={'Nome de exibição'} />
                <div className={styles.editar_biografia_container}>
                    <label>Biografia</label>
                    <TextArea className={'texto_editar_bio w_50p h_3rem'} />
                </div>
            </div>
        )
    }

    return (
        <div className={styles.perfil_container}>
            <Modal closeIconOnClick={() => { document.querySelector('.modal_editar_perfil').style.display = 'none' }} className={'modal_editar_perfil'} >
                <EditarPerfil />
            </Modal>
            <Navbar />
            <div className={styles.perfil_central}>
                <FotoCapaPerfil meuPerfil={meuPerfil} className='capa_perfil' img={infoUsuario.fotoCapaUsuario} />
                <div className={styles.perfil_info}>
                    <div className={styles.perfil_header}>
                        <Imagem className='foto_perfil_perfil' src={infoUsuario.fotoPerfilUsuario} />
                        <div className={styles.textos_header}>
                            <div className={styles.nomes_header}>
                                <span className={styles.nomeExib_header}>{infoUsuario.nomeExibicaoUsuario}</span>
                                <span className={styles.username_header}>@{infoUsuario.username}</span>
                            </div>
                            <div className={styles.bio_header}>
                            </div>
                            <div className={styles.seguidores_header}>
                                <span className={styles.seguidores}>0 seguidores</span>
                                <span className={styles.seguindo}>0 seguindo</span>
                            </div>
                        </div>
                    </div>
                    <Button handleOnClick={meuPerfil ? () => { document.querySelector('.modal_editar_perfil').style.display = 'flex'; buscarInfoEditar() } : seguir} text={meuPerfil ? 'Editar perfil' : 'Seguir'} />
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
                        {curtidasUsuario[0] ?
                            curtidasUsuario.map((post, i) => {
                                return (<Publicacao key={i} pubInfo={post} />)
                            })
                            : 'Carregando publicações...'}
                    </div>
                    <div centralativo='false' id='central_comentarios' className={styles.comentarios_usuario}>
                        {comentariosUsuario[0] ?
                            comentariosUsuario.map((comentario, i) => {
                                return (<Comentario comentario={comentario} key={1} />)
                            })
                            : 'Carregando comentários'}
                    </div>
                </div>
            </div>
            <Rightside />
        </div>
    )
}

export default Perfil