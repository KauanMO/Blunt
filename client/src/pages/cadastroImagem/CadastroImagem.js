import React from 'react'
import styles from './CadastroImagem.module.css'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'

const previewImagem = e => {
    const [img] = e.target.files
    if (img) {
        document.querySelector('#preview_image').src = URL.createObjectURL(img)
        document.querySelector('#span_upload_image').style.opacity = '0'
        document.querySelector('#cadastrar_foto_perfil').classList = ['button full_colored w_13rem']
        document.querySelector('#cadastrar_foto_perfil').innerText = 'Escolho essa'
    }
}

const cadastrarImagem = e => {
    if (e.target.innerText === 'Faço isso depois') {
        console.log('s')
    } else{
        console.log('n')
    }
}

function CadastroImagem() {
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
                                <Input handleOnChange={previewImagem} type="file" accept='image/*' />
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