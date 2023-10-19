import React from 'react'
import styles from './Feed.module.css'
import MiniPerfil from '../../components/miniPerfil/MiniPerfil'
import Publicar from '../../components/publicar/Publicar'
import FotoPerfil from '../../components/fotoPerfil/FotoPerfil'

function Feed() {
    if (!sessionStorage.getItem('idUsuario')) { window.location.href = window.location.origin }
    return (
        <div className={styles.container}>
            <div className={styles.left_side}>
                <MiniPerfil />
            </div>
            <div className={styles.center}>
                <div className={styles.publicar_container}>
                    <FotoPerfil className='foto_perfil_pub w_2rem h_2rem' />
                    <Publicar />
                </div>
            </div>
            <div className={styles.right_side}></div>
        </div>
    )
}

export default Feed