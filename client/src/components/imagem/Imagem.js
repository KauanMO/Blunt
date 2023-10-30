import React from 'react'
import './Imagem.css'

function Imagem({ src, imageClassName, name }) {
    return <img id={name} className={imageClassName} alt='' src={src}></img>
}

export default Imagem