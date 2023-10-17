import React from 'react'
import { useState } from 'react'
import './FotoPerfil.css'

function FotoPerfil({className}) {
    const [fotoUsuario, setFotoUsuario] = useState(null)
    fetch(`http://localhost:5000/usuarios/bfu/${sessionStorage.getItem('idUsuario')}`).then(res => res.json().then(foto => {
        setFotoUsuario(foto[0].fotoPerfilUsuario)
    }))
    return (
        <div>
            <img alt='' className={className} src={fotoUsuario} />
        </div>
    )
}

export default FotoPerfil