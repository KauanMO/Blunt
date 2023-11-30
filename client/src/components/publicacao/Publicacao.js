import React, { useState, useEffect } from 'react'
import styles from './Publicacao.module.css'
import Imagem from '../imagem/Imagem'
import Comentar from '../comentar/Comentar'
import { useNavigate } from "react-router-dom";

function Publicacao({ pubInfo, clicavel = true, container_comentar = true }) {
    const navigate = useNavigate();

    const redirecionar = e => {
        navigate('/' + e.target.getAttribute('redirecionamento'));
    }

    // pubInfo = nanoId, dataPublicacao, fotoPerfilUsuario, fotoPublicacao, nomeExibicaoUsuario, textoPublicacao
    let tempoPubPassado = Math.round((new Date() - new Date(pubInfo.dataPublicacao)) / (1000 * 60))
    if (tempoPubPassado > 1440) { tempoPubPassado = Math.round(tempoPubPassado / 1440) + 'd' }
    if (tempoPubPassado > 60) { tempoPubPassado = Math.round(tempoPubPassado / 60) + 'h' }
    if (tempoPubPassado < 60) { tempoPubPassado = tempoPubPassado + 'm' }

    const [curtido, setCurtido] = useState(null)
    const [qtdCurtidas, setQtdCurtidas] = useState(null)

    useEffect(() => {
        const urlVerificarCurtida = `/curtidas/vc/${sessionStorage.getItem('idUsuario')}/${pubInfo.idPublicacao}/fkPublicacao`

        const fetchDataVerificarCurtida = async () => {
            try {
                const response = await fetch(urlVerificarCurtida)
                const curtidoRes = await response.json()
                setCurtido(curtidoRes)
            } catch (error) {
                console.log("error", error)
            }
        }

        fetchDataVerificarCurtida()

        const urlContarCurtidas = `/curtidas/ccp/${pubInfo.idPublicacao}`

        const fetchDataContarCurtidas = async () => {
            try {
                const response = await fetch(urlContarCurtidas)
                const curtidasRes = await response.json()
                setQtdCurtidas(curtidasRes.curtidas)
            } catch (error) {
                console.log("error", error)
            }
        }

        fetchDataContarCurtidas()
    }, [pubInfo.idPublicacao, curtido])

    const curtirDescurtir = e => {
        fetch(`/curtidas/${curtido ? 'descurtir' : 'curtir'}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                fkUsuario: sessionStorage.getItem('idUsuario'),
                campo: 'fkPublicacao',
                fkPublicacao: pubInfo.idPublicacao
            })
        }).then(res => {
            if (res.ok) {
                setCurtido(!curtido)
            } else {
                console.log('erro');
            }
        }).catch(e => {
            console.log(e)
        })
    }

    const abrirPublicacao = e => {
        if (!e.target.classList.contains('bypass')) navigate(`/${pubInfo.username}/${pubInfo.nanoId}`)
    }

    const easterEgg = async () => {
        console.log('parabens')
    }

    return (
        <div onClick={clicavel ? abrirPublicacao : easterEgg} publicacao={pubInfo.nanoId} id={pubInfo.idPublicacao} className={styles.publicacao_container}>
            <div className={styles.topo_pub}>
                <Imagem onClick={redirecionar} redirecionamento={pubInfo.username} className="foto_usuario_pub w_3rem h_3rem bypass" src={pubInfo.fotoPerfilUsuario} />
                <div className={styles.publicacao_textos}>
                    <div className={styles.info_usuario}>
                        <span className={styles.nome_username}>
                            <span onClick={redirecionar} redirecionamento={pubInfo.username} className={styles.nome_exibicao + ' bypass'}>{pubInfo.nomeExibicaoUsuario}</span>
                            <span onClick={redirecionar} redirecionamento={pubInfo.username} className={styles.username + ' bypass'}>
                                @{pubInfo.username}
                            </span>
                            <span style={{ color: 'var(--cinza)' }}>•</span>
                            <span className={styles.dataPub}>{tempoPubPassado}</span>
                        </span>
                    </div>
                    <span>{pubInfo.textoPublicacao}</span>
                </div>
            </div>
            {pubInfo.fotoPublicacao ? <Imagem className="imagem_pub as_fe" src={pubInfo.fotoPublicacao} /> : ''}
            <div className={styles.publicacoes_opcoes}>
                <div onClick={curtirDescurtir} id={'curtir_' + pubInfo.idPublicacao} className={styles.publicacao_opcao_container}>
                    {qtdCurtidas}
                    <i className={curtido ? "fa-solid fa-heart bypass" : "fa-regular fa-heart bypass"}></i>
                </div>
                <div id={'repostar' + pubInfo.idPublicacao} className={styles.publicacao_opcao_container}>
                    <i className="fa-solid fa-repeat bypass"></i>
                </div>
                <div id={'comentar' + pubInfo.idPublicacao} className={styles.publicacao_opcao_container}>
                    <i className="fa-regular fa-comment bypass"></i>
                </div>
            </div>
            {container_comentar ? (
                <Comentar pubInfo={pubInfo} className={'comentar_container'} />
            ) : ''}

        </div>
    )
}

export default Publicacao