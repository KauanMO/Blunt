import React from 'react'
import styles from './Publicacao.module.css'
import Imagem from '../imagem/Imagem'

function Publicacao({ pubInfo }) {
    // pubInfo = dataPublicacao, fotoPerfilUsuario, fotoPublicacao, nomeExibicaoUsuario, textoPublicacao
    return (
        <div className={styles.publicacao_container}>
            <Imagem imageClassName="imagem_pub" src={pubInfo.fotoPublicacao} />
        </div>
    )
}

export default Publicacao