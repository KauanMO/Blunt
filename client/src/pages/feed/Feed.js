import React from 'react'
import MiniPerfil from '../../components/miniPerfil/MiniPerfil'
// import ModalExcluirConta from '../../components/modalExcluirConta/ModalExcluirConta'

function Feed() {
    if(!sessionStorage.getItem('idUsuario')) { window.location.href = window.location.origin }
    return (
        <div>
            <MiniPerfil />
        </div>
    )
}

export default Feed