import React from 'react'
import Input from '../input/Input'
import Button from '../button/Button'

function ModalPublicar() {
    async function publicarFoto(url, data) {
        const formData = new FormData()
        console.log(data)
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
                textoUsuarioServer: document.querySelector('#iTextoPub').value,
                fkUsuarioServer: sessionStorage.getItem('idUsuario')
            })
        }).then(res => res.json().then(pub => {
            if (document.querySelector('#iFotoPub').files[0]) {
                publicarFoto(`http://localhost:5000/azureUpload/uploadFotoPub/${pub.insertId}`, document.querySelector('#iFotoPub').files[0])
            }
        }))
    }

    return (
        <div>
            <Input type='text' name='iTextoPub' />
            <Input type='file' name='iFotoPub' />
            <Button handleOnClick={publicar} text="Publicar" />
        </div>
    )
}

export default ModalPublicar