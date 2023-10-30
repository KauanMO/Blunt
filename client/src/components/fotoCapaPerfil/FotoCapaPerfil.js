import React from 'react'
import Imagem from '../imagem/Imagem'
import './FotoCapaPerfil.css'
import { useState, useEffect } from 'react'

function FotoCapaPerfil({ img, className, imgClassName, meuPerfil }) {
    const [editavel, setEditavel] = useState(meuPerfil)

    useEffect(() => {
        setEditavel(meuPerfil)
    }, [meuPerfil])

    const hoverEditarCapaOn = e => {
        document.querySelector('.icone_editavel').style.opacity = '1'
    }

    const hoverEditarCapaOff = e => {
        document.querySelector('.icone_editavel').style.opacity = '0'
    }

    const editarCapa = e => {
        console.log(e.pageX)
    }

    return (
        <div className={className}>
            {editavel
                ? <div onClick={editarCapa} onMouseLeave={hoverEditarCapaOff} onMouseOver={hoverEditarCapaOn} className='icone_editavel'>
                    <i className="fa-regular fa-pen-to-square"></i>
                </div>
                : ''
            }
            <Imagem imageClassName={imgClassName} src={img} />
        </div>
    )
}

export default FotoCapaPerfil