import React from 'react'
import styles from './CadastroImagem.module.css'
import Input from '../../components/input/Input'

const previewImage = e => {
    const [img] = e.target.files
    if (img) {
        document.querySelector('#preview_image').src = URL.createObjectURL(img)
    }
}

function CadastroImagem() {
    return (
        <div>
            {sessionStorage.getItem('idUsuario')
                ? (
                    <div>
                        <Input handleOnChange={previewImage} type="file" accept='image/*' />
                        <div className={styles.preview_image_container}>
                            <img alt='' className={styles.preview_image} id='preview_image' />
                        </div>
                    </div>

                )
                : (<p>Sem cadastro</p>)
            }
        </div>
    )
}

export default CadastroImagem