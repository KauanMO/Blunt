import React from 'react'
import { useState, useEffect } from 'react'
import FotoPerfil from '../../components/fotoPerfil/FotoPerfil'
import styles from './MiniPerfil.module.css'

function MiniPerfil() {
    const [dadosPerfil, setDadosPerfil] = useState({
        nomeExib: '',
        username: ''
    })

    useEffect(() => {
        const url = `http://localhost:5000/usuarios/biu/${sessionStorage.getItem('idUsuario')}`

        const fetchData = async () => {
            try {
                const response = await fetch(url)
                const info = await response.json()
                setDadosPerfil({
                    nomeExib: info[0].nomeExibicaoUsuario,
                    username: info[0].username
                })
            } catch (error) {
                console.log("error", error)
            }
        }

        const openPerfilOptions = e => {
            miniPerfilOptions.style.display = 'flex'
            miniPerfilOptions.style.animation = `${styles.optionsIn} 100ms forwards`
            e.target.removeEventListener('click', openPerfilOptions)
            e.target.addEventListener('click', closePerfilOptions)
        }

        const closePerfilOptions = e => {
            miniPerfilOptions.style.animation = `${styles.optionsOut} 100ms forwards`
            setTimeout(() => {
                miniPerfilOptions.style.display = 'none'
            }, 500)
            e.target.removeEventListener('click', closePerfilOptions)
            e.target.addEventListener('click', openPerfilOptions)
        }

        const miniPerfilContainer = document.querySelector('#mini_perfil_container')
        const miniPerfilOptions = document.querySelector('#mini_perfil_options')

        miniPerfilContainer.addEventListener('click', openPerfilOptions, { once: true })

        fetchData()
    }, [])

    const logout = () => {
        sessionStorage.clear()
        window.location.href = window.location.origin
    }

    return (
        <div id='mini_perfil_container' className={styles.mini_perfil_container}>
            <div id='mini_perfil_options' className={styles.mini_perfil_options}>
                <a href={dadosPerfil.username}><li className={styles.mini_perfil_option}>Meu perfil</li></a>
                <li onClick={logout} style={{ color: 'red' }} className={styles.mini_perfil_option}> <i className="fa-solid fa-right-from-bracket"></i>Sair</li>
            </div>
            <FotoPerfil imageClassName='mini_perfil_feed w_2rem h_2rem' />
            <div className={styles.name_username_container}>
                <span className={styles.span_nomeExib}>{dadosPerfil.nomeExib}</span>
                <span className={styles.span_username}>@{dadosPerfil.username}</span>
            </div>
        </div>
    )
}

export default MiniPerfil