import React from 'react'
import styles from './Feed.module.css'
import MiniPerfil from '../../components/miniPerfil/MiniPerfil'
import ModalPublicar from '../../components/modalPublicar/ModalPublicar'
// import ModalExcluirConta from '../../components/modalExcluirConta/ModalExcluirConta'

function Feed() {
    if (!sessionStorage.getItem('idUsuario')) { window.location.href = window.location.origin }
    return (
        <div className={styles.container}>
            <MiniPerfil />
            <ModalPublicar />
        </div>
    )
}

export default Feed