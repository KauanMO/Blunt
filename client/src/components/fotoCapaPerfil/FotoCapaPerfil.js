import React from 'react'
import Imagem from '../imagem/Imagem'
import DropDownmenu from '../dropDownMenu/DropDownMenu'
import './FotoCapaPerfil.css'
import { useState, useEffect } from 'react'


function FotoCapaPerfil({ img, className, imgClassName, meuPerfil }) {
    const [editavel, setEditavel] = useState(meuPerfil)

    useEffect(() => {
        setEditavel(meuPerfil)
    }, [meuPerfil])

    const hoverEditarCapaOn = e => {
        e.target.style.opacity = '1'
    }

    const hoverEditarCapaOff = e => {
        e.target.style.opacity = '0'
    }

    function animacaoAbrirDropDownMenu(dropDownMenu, e) {
        dropDownMenu.style.display = 'flex'
        dropDownMenu.style.top = `${e.pageY}px`
        dropDownMenu.style.left = `calc(${e.pageX}px - 40%)`
        dropDownMenu.style.animation = `dropdownOn 100ms forwards`
    }

    const abrirDropDownMenu = ed => {
        let dropDownMenu = document.querySelector('#dropDown_menu')
        animacaoAbrirDropDownMenu(dropDownMenu, ed)

        aplicarOnClickAway(ed, dropDownMenu)
    }

    function aplicarOnClickAway(ed, dropDownMenu) {
        window.addEventListener('click', e => {
            if (e.target !== ed.target && !e.target.getAttribute('windowonclickbypass')) {
                dropDownMenu.style.animation = `dropdownOut 100ms forwards`
            } else {
                aplicarOnClickAway(ed, dropDownMenu)
            }
        }, { once: true })
    }

    const editarCapa = e => {
        console.log(e.target)
    }

    const dropDownOpcoes = [
        {
            label: 'Editar capa',
            i: <i className="fa-regular fa-pen-to-square"></i>,
            handleOnCLick: editarCapa
        },
        {
            label: 'Visualizar capa',
            i: <i className="fa-regular fa-pen-to-square"></i>
        },
        {
            label: 'Excluir capa',
            i: <i style={{ color: 'red' }} className="fa-regular fa-pen-to-square"></i>,
            style: { color: 'red' }
        },
        {
            label: 'Editar cor de fundo',
            i: <i className="fa-regular fa-pen-to-square"></i>
        },
    ]

    return (
        <div className={className}>
            <DropDownmenu name='dropDown_menu' opcoes={dropDownOpcoes} />
            {editavel
                ? <div onClick={abrirDropDownMenu} onMouseLeave={hoverEditarCapaOff} onMouseOver={hoverEditarCapaOn} className='icone_editavel'>
                    <i className="fa-regular fa-pen-to-square"></i>
                </div>
                : ''
            }
            <Imagem imageClassName={imgClassName} src={img} />
        </div>
    )
}

export default FotoCapaPerfil