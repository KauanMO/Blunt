import React, { useState, useEffect } from 'react'
import styles from './Perfil.module.css'
import Imagem from '../../components/imagem/Imagem'

function Perfil() {
    const [infoUsuario, setInfoUsuario] = useState({
        fotoPerfilUsuario: ''
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
            <Imagem src={infoUsuario.fotoPerfilUsuario} />
        </div>
    )
}

export default Perfil