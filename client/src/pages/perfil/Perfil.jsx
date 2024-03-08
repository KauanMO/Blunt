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
        idUsuario: null,
        username: null,
        nomeExibicaoUsuario: null,
        fotoCapaUsuario: null,
        fotoPerfilUsuario: null,
        bioUsuario: null
    })

    const [pubsUsuario, setPubsUsuario] = useState([])
    const [curtidasUsuario, setCurtidasUsuario] = useState([])
    const [comentariosUsuario, setComentariosUsuario] = useState([])
    const [meuPerfil, setMeuPerfil] = useState(false)
    const [seguido, setSeguido] = useState(false)
    const [qtdSeguidores, setQtdSeguidores] = useState(0)
    const [qtdSeguindo, setQtdSeguindo] = useState(0)

    useEffect(() => {
        const fetchDataInfoUsuario = async () => {
            try {
                const response = await fetch(`/usuarios/biuu/${window.location.href.split('/')[3]}`, { headers: { auth_token: localStorage.getItem('jwt') } })
                const infoUsuarioRes = await response.json()
                setInfoUsuario(infoUsuarioRes[0])
            } catch (e) {
                console.log(e)
            }
        }
        fetchDataInfoUsuario()

        const fetchPublicacoesUsuario = async () => {
            if (!infoUsuario.idUsuario) { return }
            try {
                const response = await fetch(`/publicacoes/bpu/${infoUsuario.idUsuario}`)
                const pubsUsuarioRes = await response.json()
                setPubsUsuario(pubsUsuarioRes)
            } catch (e) {
                console.log(e)
            }
        }
        fetchPublicacoesUsuario()

        const fetchCurtidasUsuario = async () => {
            if (!infoUsuario.idUsuario) { return }
            try {
                const response = await fetch(`/publicacoes/bpcu/${infoUsuario.idUsuario}`)
                const curtidasUsuarioRes = await response.json()
                setCurtidasUsuario(curtidasUsuarioRes)
            } catch (e) {
                console.log(e)
            }
        }
        fetchCurtidasUsuario()

        const fetchComentariosUsuario = async () => {
            if (!infoUsuario.idUsuario) { return }
            try {
                const comentariosUsuarioRes = await fetch(`/comentarios/lcu/${infoUsuario.idUsuario}`)
                const comentariosUsuario = await comentariosUsuarioRes.json()
                setComentariosUsuario(comentariosUsuario)
            } catch (e) {
                console.log(e)
            }
        }
        fetchComentariosUsuario()

        const fetchVerificarSeguidor = async () => {
            if (!infoUsuario.idUsuario) return

            try {
                const verificarSeguidorRes = await fetch(`/seguidores/vs/${sessionStorage.getItem('idUsuario')}/${infoUsuario.idUsuario}`, { headers: { token_auth: localStorage.getItem('jwt') } })
                const verificarSeguidor = await verificarSeguidorRes.json()
                setSeguido(verificarSeguidor)
            } catch (e) {
                console.log(e)
            }
        }
        fetchVerificarSeguidor()

        const fetchBuscarQtdSeguidores = async () => {
            if (!infoUsuario.idUsuario) return

            try {
                const resQtdSeguidores = await fetch(`/seguidores/bqtds/${infoUsuario.idUsuario}`)
                const qtdSeguidores = await resQtdSeguidores.json()
                setQtdSeguidores(qtdSeguidores)
            } catch (e) {
                console.log(e)
            }
        }
        fetchBuscarQtdSeguidores()

        const fetchBuscarQtdSeguindo = async () => {
            if (!infoUsuario.idUsuario) return

            try {
                const resQtdSeguindo = await fetch(`/seguidores/bqtdsd/${infoUsuario.idUsuario}`)
                const qtdSeguindo = await resQtdSeguindo.json()
                setQtdSeguindo(qtdSeguindo)
            } catch (e) {
                console.log(e)
            }
        }
        fetchBuscarQtdSeguindo()

        if (infoUsuario.idUsuario === sessionStorage.getItem('idUsuario')) setMeuPerfil(true)
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
        const centralAtivo = document.querySelector('#conteudo_central').querySelector("[centralativo='true']"),
            centralPublicacoes = document.querySelector('#central_publicacoes'),
            centralCurtidas = document.querySelector('#central_curtidas'),
            centralComentarios = document.querySelector('#central_comentarios')

        if (centralAtivo.id.split('_')[1] !== conteudo) {
            centralAtivo.setAttribute("centralativo", "false")
            centralAtivo.style.animation = `${styles.conteudoCentralOut} 150ms forwards`
        } else return

        switch (conteudo) {
            case 'publicacoes':
                centralPublicacoes.style.display = 'flex'
                centralPublicacoes.style.animation = `${styles.conteudoCentralIn} 150ms forwards`
                centralPublicacoes.setAttribute("centralativo", "true")
                break
            case 'curtidas':
                centralCurtidas.style.display = 'flex'
                centralCurtidas.style.animation = `${styles.conteudoCentralIn} 150ms forwards`
                centralCurtidas.setAttribute("centralativo", "true")
                break
            case 'comentarios':
                centralComentarios.style.display = 'flex'
                centralComentarios.style.animation = `${styles.conteudoCentralIn} 150ms forwards`
                centralComentarios.setAttribute("centralativo", "true")
                break
            default:
                break
        }
    }

    const mudarOpcaoNavegacao = e => {
        animacaoUnderlineOpcaoNavegacao(e.target.id)
        mudarConteudoCentral(e.target.id)
    }

    const seguir = async e => {
        try {
            const urlSeguir = `/seguidores/${seguido ? 'dds' : 'seguir'}`

            await fetch(urlSeguir, {
                method: 'POST',
                headers: {
                    token_auth: localStorage.getItem('jwt'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fkSeguidor: sessionStorage.getItem('idUsuario'),
                    fkSeguido: infoUsuario.idUsuario
                })
            })
            e.target.classList = seguido ? ['button pr w_6rem negative_colored'] : ['button pr w_6rem full_colored']
            e.target.innerText = seguido ? 'Seguir' : 'Seguindo'
            setSeguido(!seguido)
        } catch (er) {
            console.log(er)
        }
    }

    let nomeUsuarioInicial, nomeExibicaoUsuarioInicial, bioUsuarioInicial

    const buscarInfoEditar = async () => {
        try {
            const infoUsuarioRes = await fetch(`/usuarios/biu/${sessionStorage.getItem('idUsuario')}`, { headers: { token_auth: localStorage.getItem('jwt') } })
            const infoUsuario = await infoUsuarioRes.json()
            document.querySelector('#editar_nome_usuario').value = infoUsuario.username
            document.querySelector('#editar_nome_exibicao').value = infoUsuario.nomeExibicaoUsuario
            document.querySelector('#editar_bio').value = infoUsuario.bioUsuario

            nomeUsuarioInicial = infoUsuario.username
            nomeExibicaoUsuarioInicial = infoUsuario.nomeExibicaoUsuario
            bioUsuarioInicial = infoUsuario.bioUsuario
        } catch (e) {
            console.log(e)
        }
    }

    const EditarPerfil = () => {
        async function editarPerfil() {
            let edicao = [
                {
                    campo: 'username',
                    valorInicial: nomeUsuarioInicial,
                    valorEditar: document.querySelector('#editar_nome_usuario').value
                },
                {
                    campo: 'nomeExibicaoUsuario',
                    valorInicial: nomeExibicaoUsuarioInicial,
                    valorEditar: document.querySelector('#editar_nome_exibicao').value
                },
                {
                    campo: 'bioUsuario',
                    valorInicial: bioUsuarioInicial,
                    valorEditar: document.querySelector('#editar_bio').value
                }
            ]

            const fetchEditarPerfil = async (idUsuario, campo, valor) => {
                const resEditarPerfil = await fetch(`/usuarios/euc`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                        token_auth: localStorage.getItem('jwt')
                    },
                    body: JSON.stringify({
                        idUsuario: idUsuario,
                        campo: campo,
                        valor: valor
                    })
                })

                if (!resEditarPerfil.ok) {
                    const mensagemEditarPerfil = await resEditarPerfil.json()
                    console.log(mensagemEditarPerfil.mensagem)
                }
            }

            edicao.forEach(edit => {
                if (edit.valorInicial !== edit.valorEditar) { fetchEditarPerfil(sessionStorage.getItem('idUsuario'), edit.campo, edit.valorEditar) }
            })

            window.location.href = edicao[0].valorEditar
        }

        if (meuPerfil) {
            return (
                <div>
                    <Input name={'editar_nome_usuario'} className={'editar_perfil'} labelColor='white' label={'Nome de usuário'} />
                    <Input name={'editar_nome_exibicao'} className={'editar_perfil'} labelColor='white' label={'Nome de exibição'} />
                    <div className={styles.editar_biografia_container}>
                        <label>Biografia</label>
                        <TextArea name={'editar_bio'} className={'texto_editar_bio w_50p h_3rem'} />
                    </div>
                    <Button handleOnClick={editarPerfil} className={'negative_colored'} text={'Editar'} />
                </div>
            )
        }
    }

    const IconeNotificar = () => {
        return (
            <i className={`fa-regular fa-bell ${styles.icone_notificar}`} />
        )
    }

    const abrirModalEditarPerfil = () => {
        document.querySelector('.modal_editar_perfil').style.display = 'flex'
        buscarInfoEditar()
    }

    return (
        <div className={styles.perfil_container}>
            <Modal className={'modal_editar_perfil'} >
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
                                {infoUsuario.bioUsuario
                                    ? infoUsuario.bioUsuario
                                    : ''}
                            </div>
                            <div className={styles.seguidores_header}>
                                <span className={styles.seguidores}>{qtdSeguidores} seguidores</span>
                                <span className={styles.seguindo}>{qtdSeguindo} seguindo</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        className={`w_7rem pr ${seguido ? 'full_colored' : 'negative_colored'}`}
                        handleOnClick={meuPerfil
                            ? abrirModalEditarPerfil
                            : seguir}
                        text={meuPerfil ? 'Editar perfil' : seguido ? 'Seguindo' : 'Seguir'} >
                        {seguido ? <IconeNotificar /> : ''}
                    </Button>
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
                    <div style={{ display: 'flex', opacity: '1' }} centralativo='true' id='central_publicacoes' className={styles.publicacoes_usuario}>
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
                                return (
                                    <div className={styles.comentario_usuario_container} key={i}>
                                        <Publicacao key={i} pubInfo={{
                                            idPublicacao: comentario.fkPublicacao,
                                            nanoId: comentario.nanoId,
                                            dataPublicacao: comentario.dataPublicacao,
                                            fotoPublicacao: comentario.fotoPublicacao,
                                            textoPublicacao: comentario.textoPublicacao,
                                            fotoPerfilUsuario: comentario.fotoPerfilUsuarioPublicacao,
                                            nomeExibicaoUsuario: comentario.nomeExibicaoUsuarioPublicacao,
                                            username: comentario.usernamePublicacao
                                        }} container_comentar={false} />
                                        <i className={`fa-solid fa-up-long ${styles.icon_sinalizador_comentario}`}></i>
                                        <Comentario comentario={comentario} />
                                    </div>
                                )
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