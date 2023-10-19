import React from 'react'
import styles from './Feed.module.css'
import MiniPerfil from '../../components/miniPerfil/MiniPerfil'
import Publicar from '../../components/publicar/Publicar'
// import ModalExcluirConta from '../../components/modalExcluirConta/ModalExcluirConta'

function Feed() {
    if (!sessionStorage.getItem('idUsuario')) { window.location.href = window.location.origin }
    return (
        <div className={styles.container}>
            <div className={styles.left_side}>
                <MiniPerfil />
            </div>
            <div className={styles.center}>
                <div className={styles.publicar_container}>
                    <Publicar />
                </div>
            </div>
            <div className={styles.right_side}></div>
        </div>
    )
}

export default Feed