import React from 'react'
import { useState } from 'react'
import FotoPerfil from '../../components/fotoPerfil/FotoPerfil'
import styles from './MiniPerfil.module.css'

function MiniPerfil() {
    const [dadosPerfil, setDadosPerfil] = useState({
        nomeExib: '',
        username: ''
    })

    fetch(`http://localhost:5000/usuarios/biu/${sessionStorage.getItem('idUsuario')}`).then(res => res.json().then(info => {
        setDadosPerfil({
            nomeExib: info[0].nomeExibicaoUsuario,
            username: info[0].username
        })
    }))

    return (
        <div className={styles.mini_perfil_container}>
            <FotoPerfil className='mini-perfil-feed w_3rem' />
            <div className={styles.name_username_container}>
                <span className={styles.span_nomeExib}>{dadosPerfil.nomeExib}</span>
                <span className={styles.username}>@{dadosPerfil.username}</span>
            </div>
        </div>
    )
}

export default MiniPerfil