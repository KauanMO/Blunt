import React from 'react'
import { useState } from "react";
import styles from './CadastroImagem.module.css'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'

function CadastroImagem() {
    const [image, setImage] = useState(null)

    const previewImagem = e => {
        const [img] = e.target.files
        setImage(img)
        if (img) {
            document.querySelector('#preview_image').src = URL.createObjectURL(img)
            document.querySelector('#span_upload_image').style.opacity = '0'
            document.querySelector('#cadastrar_foto_perfil').classList = ['button full_colored w_13rem']
            document.querySelector('#cadastrar_foto_perfil').innerText = 'Escolho essa'
        }
    }

    const cadastrarImagem = e => {
        if (e.target.innerText === 'Faço isso depois') {
            window.location.href = '/feed'
        } else {
            document.querySelector('#img_form').submit()
            window.location.href = '/feed'
        }
    }
    return (
        <div>
            {sessionStorage.getItem('idUsuario')
                ? (
                    <main className={styles.container}>
                        <div className={styles.input_preview_image_container}>
                            <span>Escolha sua foto de perfil</span>
                            <label id='label_preview_image' className={styles.label_preview_image}>
                                <span className={styles.span_upload_image} id='span_upload_image'>
                                    <i className="fa-solid fa-upload"></i>
                                    upload
                                </span>
                                <form id='img_form' action='http://localhost:5000/azureUpload' method='post' encType='multipart/form-data'>
                                    <Input handleOnChange={previewImagem} name='imageToUpload' id='#img_perfil' type="file" accept='image/*' />
                                </form>
                                <div className={styles.preview_image_container}>
                                    <img alt='' className={styles.preview_image} id='preview_image' />
                                </div>
                            </label>
                            <Button handleOnClick={cadastrarImagem} text="Faço isso depois" id="cadastrar_foto_perfil" className="negative_colored w_13rem" />
                        </div>
                    </main>
                )
                : (
                    <p>Sem cadastro</p>
                )
            }
        </div>
    )
}

export default CadastroImagem