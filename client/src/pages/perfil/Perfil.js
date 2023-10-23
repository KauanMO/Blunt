import React, { useState, useEffect } from 'react'
import styles from './Perfil.module.css'
import Imagem from '../../components/imagem/Imagem'
import Navbar from '../../components/navbar/Navbar'

function Perfil() {
    // infoUsuario = bioUsuario, dataCadastro, fotoPerfilUsuario, idUsuario, nomeExibicaoUsuario, username
    const [infoUsuario, setInfoUsuario] = useState({
        username: '',
        nomeExibicaoUsuario: '',
        fotoPerfilUsuario: '',
        bioUsuario: ''
    })

    useEffect(() => {
        const urlVerificarCurtida = `http://localhost:5000/usuarios/biuu/${window.location.href.split('/')[3]}`

        const fetchDataInfoUsuario = async () => {
            try {
                const response = await fetch(urlVerificarCurtida)
                const infoUsuarioRes = await response.json()
                console.log(infoUsuarioRes)
                setInfoUsuario(infoUsuarioRes[0])
            } catch (error) {
                console.log("error", error)
            }
        }

        fetchDataInfoUsuario()
    }, [])


    return (
        <div className={styles.perfil_container}>
            <Navbar />
            <div className={styles.perfil_header}>
                <Imagem imageClassName='foto_perfil_perfil' src={infoUsuario.fotoPerfilUsuario} />
                <div className={styles.textos_header}>
                    <div className={styles.nomes_header}>
                        <span className={styles.username_header}>{infoUsuario.username}</span>
                        <span className={styles.nomeExib_header}>@{infoUsuario.nomeExibicaoUsuario}</span>
                    </div>
                    <div className={styles.bio_header}>
                        {infoUsuario.bioUsuario ? infoUsuario.bioUsuario : ''}
                    </div>
                    <div className={styles.seguidores_header}>
                        <span className={styles.seguidores}>0 seguidores</span>
                        <span className={styles.seguindo}>0 seguindo</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil