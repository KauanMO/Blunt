import React from 'react'
import Imagem from '../imagem/Imagem'
import DropDownmenu from '../dropDownMenu/DropDownMenu'
import './FotoCapaPerfil.css'
import { useState, useEffect } from 'react'

function FotoCapaPerfil({ img, className, imgClassName, meuPerfil }) {
    const [editavel, setEditavel] = useState(meuPerfil)
    const [capa, setCapa] = useState(img)

    useEffect(() => {
        setEditavel(meuPerfil)
    }, [meuPerfil])

    useEffect(() => {
        setCapa(img)
    }, [img])

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

    function abrirConfirmCapa() {
        let confirmCapa = document.querySelector('#dropDown_confirm_capa')
        confirmCapa.style.display = 'flex'
        confirmCapa.style.top = '50%'
        confirmCapa.style.left = '100%'
        confirmCapa.style.animation = `dropdownOn 100ms forwards`
    }

    const editarCapa = e => {
        document.querySelector('#input_foto_capa_perfil').click()
    }

    const previewCapa = e => {
        if (e.target.files[0]) {
            setCapa(URL.createObjectURL(e.target.files[0]))
            abrirConfirmCapa()
        }
    }

    const dropDownOpcoesCapa = [
        {
            label: 'Editar capa',
            i: <i className="fa-regular fa-pen-to-square"></i>,
            handleOnClick: editarCapa
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

    const uploadCapa = async e => {
        const formData = new FormData()
        formData.append('fotoCapaUsuario', document.querySelector('#input_foto_capa_perfil').files[0])

        let confirmCapa = document.querySelector('#dropDown_confirm_capa')
        confirmCapa.style.animation = `dropdownOut 100ms forwards`
        document.querySelector('#input_foto_capa_perfil').value = ''

        await fetch(`http://localhost:5000/azureUpload/uploadCapaUsuario/${sessionStorage.getItem('idUsuario')}`, {
            method: 'POST',
            body: formData
        })
    }

    const cancelarUpload = e => {
        let confirmCapa = document.querySelector('#dropDown_confirm_capa')
        confirmCapa.style.animation = `dropdownOut 100ms forwards`
        document.querySelector('#input_foto_capa_perfil').value = ''
        setCapa(img)
    }

    const dropDownConfirmCapa = [
        {
            label: 'Está otimo!',
            i: <i style={{ color: 'green' }} className="fa-solid fa-check"></i>,
            handleOnClick: uploadCapa
        },
        {
            label: 'Essa não',
            i: <i style={{ color: 'red' }} className="fa-solid fa-x"></i>,
            handleOnClick: cancelarUpload
        }
    ]

    return (
        <div id='foto_capa_perfil' className={className}>
            <input accept='image/*' onChange={previewCapa} type='file' style={{ display: 'none' }} id='input_foto_capa_perfil' name='input_foto_capa_perfil' />
            <DropDownmenu name='dropDown_menu' opcoes={dropDownOpcoesCapa} />
            <DropDownmenu name='dropDown_confirm_capa' opcoes={dropDownConfirmCapa} />
            {editavel
                ? <div onClick={abrirDropDownMenu} onMouseLeave={hoverEditarCapaOff} onMouseOver={hoverEditarCapaOn} className='icone_editavel'>
                    <i className="fa-regular fa-pen-to-square"></i>
                </div>
                : ''
            }
            {capa
                ? <Imagem name='foto_capa_perfil' src={capa} className='foto_capa_perfil' />
                : ''
            }
        </div>
    )
}

export default FotoCapaPerfil