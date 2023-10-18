import React from 'react'
import { useState, useEffect } from 'react'
import './FotoPerfil.css'

function FotoPerfil({ className }) {
    const [fotoUsuario, setFotoUsuario] = useState('')

    useEffect(() => {
        const url = `http://localhost:5000/usuarios/bfu/${sessionStorage.getItem('idUsuario')}`;

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
            <img alt='' className={className} src={fotoUsuario} />
        </div>
    )
}

export default FotoPerfil