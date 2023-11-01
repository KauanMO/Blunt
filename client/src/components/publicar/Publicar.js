import React from 'react'
import Input from '../input/Input'
import Button from '../button/Button'
import styles from './Publicar.module.css'
import TextArea from '../textArea/TextArea'
import { useState } from 'react'
import FotoPerfil from '../../components/fotoPerfil/FotoPerfil'
import { nanoid } from 'nanoid'

function ModalPublicar() {
    const [textoPub, setTextoPub] = useState('')

    const attTextoPub = e => {
        setTextoPub(e.target.value)
    }

    async function publicarFoto(url, data) {
        const formData = new FormData()
        formData.append('fotoPublicacaoUpload', data)

        await fetch(url, {
            method: 'POST',
            body: formData
        })
    }

    const publicar = () => {
        fetch('http://localhost:5000/publicacoes/publicar', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                textoUsuarioServer: textoPub,
                fkUsuarioServer: sessionStorage.getItem('idUsuario'),
                nanoIdServer: `${nanoid()}-${sessionStorage.getItem('idUsuario')}`
            })
        }).then(res => res.json().then(pub => {
            if (res.ok) {
                notificarPublicado()
                if (document.querySelector('#iFotoPub').files[0]) {
                    publicarFoto(`http://localhost:5000/azureUpload/uploadFotoPub/${pub.insertId}`, document.querySelector('#iFotoPub').files[0])
                }
            }
        }))
    }

    const notificarPublicado = () => {
        document.querySelector('#iTextoPub').style.animation = 'check 600ms'
        setTimeout(() => {
            document.querySelector('#iTextoPub').value = ''
            document.querySelector('#iTextoPub').blur()
            document.querySelector('#iTextoPub').style.animation = ''
        }, 500);
    }

    const animacoesAbrirPub = () => {
        document.querySelector('#publicar_container').style.height = '7rem'
        document.querySelector('#bt_publicar').style.display = 'flex'
        document.querySelector('#publicar_imagem_icon').style.display = 'flex'
        setTimeout(() => {
            document.querySelector('#publicar_imagem_icon').style.opacity = '1'
            document.querySelector('#bt_publicar').style.opacity = '1'
        }, 100);
    }

    const animacoesFecharPub = () => {
        document.querySelector('#publicar_container').style.height = '3rem'
        document.querySelector('#publicar_imagem_icon').style.opacity = '0'
        document.querySelector('#bt_publicar').style.opacity = '0'
        setTimeout(() => {
            document.querySelector('#publicar_imagem_icon').style.display = 'none'
            document.querySelector('#bt_publicar').style.display = 'none'
        }, 100);
    }

    const abrirPublicar = e => {
        e.target.style.height = '3.7rem'
        animacoesAbrirPub()
    }

    const fecharPublicar = e => {
        if (e.target.value) { return }
        e.target.style.height = '0.9rem'
        animacoesFecharPub()
    }

    return (
        <div id='publicar_container' className={styles.publicar_container}>
            <FotoPerfil imageClassName='foto_perfil_pub w_2rem h_2rem' />
            <TextArea handleOnBlur={fecharPublicar} handleOnFocus={abrirPublicar}
                placeholder="Publique o que está pensando" name='iTextoPub'
                className="w_100p texto_publicacao"
                handleOnChange={attTextoPub}
                maxLength='200'
            />
            <label className={styles.publicar_imagem_icon} id='publicar_imagem_icon' htmlFor='iFotoPub'>
                <i className="fa-regular fa-image" />
            </label>
            <Input style={{ display: 'none' }} type='file' name='iFotoPub' />
            <Button id='bt_publicar' className='bt_publicar' handleOnClick={publicar} text="Publicar" />
        </div>
    )
}

export default ModalPublicar