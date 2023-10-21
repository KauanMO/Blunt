import React, { useState, useEffect } from 'react'
import styles from './Publicacao.module.css'
import Imagem from '../imagem/Imagem'

function Publicacao({ pubInfo }) {
    // pubInfo = dataPublicacao, fotoPerfilUsuario, fotoPublicacao, nomeExibicaoUsuario, textoPublicacao
    let tempoPubPassado = Math.round((new Date() - new Date(pubInfo.dataPublicacao)) / (1000 * 60 * 60))
    if (tempoPubPassado < 24) { tempoPubPassado += 'h' }
    if (tempoPubPassado >= 24) { tempoPubPassado = Math.round(tempoPubPassado / 24) + 'd' }
    if (tempoPubPassado >= 24) { tempoPubPassado = Math.round(tempoPubPassado / 30) + 'm' }

    const [curtido, setCurtido] = useState(null)

    useEffect(() => {
        const url = `http://localhost:5000/curtidas/vc/${sessionStorage.getItem('idUsuario')}/${pubInfo.idPublicacao}`

        const fetchData = async () => {
            try {
                const response = await fetch(url)
                const curtidoRes = await response.json()
                setCurtido(curtidoRes)
            } catch (error) {
                console.log("error", error)
            }
        }

        fetchData()
    }, [pubInfo.idPublicacao])

    const curtirDescurtir = e => {
        fetch(`http://localhost:5000/curtidas/${curtido ? 'descurtir' : 'curtir'}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                fkUsuario: sessionStorage.getItem('idUsuario'),
                fkPublicacao: pubInfo.idPublicacao
            })
        }).then(res => {
            console.log(res)
            if (res.ok) {
                setCurtido(!curtido)
            } else {
                console.log('erro');
            }
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div id={pubInfo.idPublicacao} className={styles.publicacao_container}>
            <div className={styles.topo_pub}>
                <Imagem imageClassName="foto_usuario_pub w_2rem h_2rem" src={pubInfo.fotoPerfilUsuario} />
                <div className={styles.publicacao_textos}>
                    <div className={styles.info_usuario}>
                        <span className={styles.nome_username}>
                            <span className={styles.nome_exibicao}>{pubInfo.nomeExibicaoUsuario}</span>
                            <span className={styles.username}>
                                @{pubInfo.username}
                            </span>
                            <span style={{ color: 'var(--cinza)' }}>•</span>
                            <span className={styles.dataPub}>{tempoPubPassado}</span>
                        </span>
                    </div>
                    <span>{pubInfo.textoPublicacao}</span>
                </div>
            </div>
            {pubInfo.fotoPublicacao ? <Imagem imageClassName="imagem_pub as_fe" src={pubInfo.fotoPublicacao} /> : ''}
            <div className={styles.publicacoes_opcoes}>
                <div onClick={curtirDescurtir} id={'curtir_' + pubInfo.idPublicacao} className={styles.publicacao_opcao_container}>
                    <i className={curtido ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    <span>Curtidas</span>
                </div>
                <div id={'repostar' + pubInfo.idPublicacao} className={styles.publicacao_opcao_container}>
                    <i className="fa-solid fa-repeat"></i>
                    <span>Repostagens</span>
                </div>
                <div id={'comentar' + pubInfo.idPublicacao} className={styles.publicacao_opcao_container}>
                    <i className="fa-regular fa-comment"></i>
                    <span>Comentarios</span>
                </div>
            </div>
        </div>
    )
}

export default Publicacao