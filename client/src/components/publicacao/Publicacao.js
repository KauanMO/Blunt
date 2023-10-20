import React from 'react'
import styles from './Publicacao.module.css'
import Imagem from '../imagem/Imagem'

function Publicacao({ pubInfo }) {
    // pubInfo = dataPublicacao, fotoPerfilUsuario, fotoPublicacao, nomeExibicaoUsuario, textoPublicacao
    let tempoPubPassado = Math.round((new Date() - new Date(pubInfo.dataPublicacao)) / (1000 * 60 * 60)) + 'h'
    if (tempoPubPassado > 24) { tempoPubPassado /= 24 + 'd' }
    if (tempoPubPassado > 30) { tempoPubPassado /= 30 + 'm' }

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
                <div id={'curtir_' + pubInfo.idPublicacao} className={styles.publicacao_opcao_container}>
                    <i className="fa-regular fa-heart"></i>
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