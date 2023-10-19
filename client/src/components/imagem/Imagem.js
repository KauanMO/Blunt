import React from 'react'
import './Imagem.css'

function Imagem({ src, imageClassName }) {
    return <img className={imageClassName} alt='' src={src}></img>
}

export default Imagem