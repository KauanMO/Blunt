import React from 'react'
import styles from './Publicacao.module.css'
import Imagem from '../imagem/Imagem'

function Publicacao({ pubInfo }) {
    // pubInfo = dataPublicacao, fotoPerfilUsuario, fotoPublicacao, nomeExibicaoUsuario, textoPublicacao
    let tempoPubPassado = Math.round((new Date() - new Date(pubInfo.dataPublicacao)) / (1000 * 60 * 60)) + 'h'
    if (tempoPubPassado > 24) { tempoPubPassado /= 24 + 'd' }
    if (tempoPubPassado > 30) { tempoPubPassado /= 30 + 'm' }

    return (
        <div className={styles.publicacao_container}>
            <div className={styles.topo_pub}>
                <Imagem imageClassName="foto_usuario_pub w_2rem h_2rem" src={pubInfo.fotoPerfilUsuario} />
                <div className={styles.publicacao_textos}>
                    <div className={styles.info_usuario}>
                        <span className={styles.nome_username}>
                            {pubInfo.nomeExibicaoUsuario} <span className={styles.username}>
                                @{pubInfo.username}
                            </span>
                            <span style={{color: 'var(--cinza)'}}>•</span>
                            <span className={styles.dataPub}>{tempoPubPassado}</span>
                        </span>
                    </div>
                    <span>{pubInfo.textoPublicacao}</span>
                </div>
            </div>
            {pubInfo.fotoPublicacao ? <Imagem imageClassName="imagem_pub as_fe" src={pubInfo.fotoPublicacao} /> : ''}

        </div>
    )
}

export default Publicacao