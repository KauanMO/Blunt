import React from 'react'
import { useState, useEffect } from 'react'
import Imagem from '../imagem/Imagem'
import './FotoPerfil.css'

function FotoPerfil({ imageClassName }) {
    const [fotoUsuario, setFotoUsuario] = useState('')

    useEffect(() => {
        const url = `/usuarios/bfu/${sessionStorage.getItem('idUsuario')}`;

        const fetchData = async () => {
            try {
                const response = await fetch(url)
                const foto = await response.json()
                setFotoUsuario(foto[0].fotoPerfilUsuario)
            } catch (error) {
                console.log("error", error)
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            <Imagem alt='' className={imageClassName} src={fotoUsuario} />
        </div>
    )
}

export default FotoPerfil