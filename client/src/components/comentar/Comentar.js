import React from "react"
import FotoPerfil from '../fotoPerfil/FotoPerfil'
import TextArea from "../textArea/TextArea"
import Button from "../button/Button"
import './Comentar.css'

function Comentar({ pubInfo, className }) {
    const comentar = e => {
        let textoComentario = document.querySelector(`#texto_comentario_${pubInfo.idPublicacao}`).value
        fetch('http://localhost:5000/comentarios/comentar', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                textoComentario: textoComentario,
                fkPublicacao: pubInfo.idPublicacao,
                fkUsuario: sessionStorage.getItem('idUsuario')
            }),
        }).then(res => {
            if (!res.ok) { console.log(res) }
        }).catch(e => {
            console.log(e)
        })
    }

    function animacoesAbrirCom() {
        document.querySelector(`#comentar_container_${pubInfo.idPublicacao}`).style.height = '4rem'
        document.querySelector(`#bt_comentar_${pubInfo.idPublicacao}`).style.display = 'flex'
        setTimeout(() => {
            document.querySelector(`#bt_comentar_${pubInfo.idPublicacao}`).style.opacity = '1'
        }, 100);
    }

    function animacoesFecharCom() {
        document.querySelector(`#comentar_container_${pubInfo.idPublicacao}`).style.height = '2rem'
        document.querySelector(`#bt_comentar_${pubInfo.idPublicacao}`).style.opacity = '0'
        setTimeout(() => {
            document.querySelector(`#bt_comentar_${pubInfo.idPublicacao}`).style.display = 'none'
        }, 100);
    }

    const abrirComentario = e => {
        e.target.style.height = '2.8rem'
        animacoesAbrirCom()
    }

    const fecharComentario = e => {
        if (!e.target.value) {
            e.target.style.height = '0.9rem'
            animacoesFecharCom()
        }
    }

    return (
        <div id={`comentar_container_${pubInfo.idPublicacao}`} className={className}>
            <FotoPerfil imageClassName='foto_perfil_com w_2rem h_2rem bypass' />
            <TextArea
                name={`texto_comentario_${pubInfo.idPublicacao}`}
                className='w_80p texto_comentario bypass'
                placeholder='Adicione um comentário'
                maxLength='155'
                handleOnFocus={abrirComentario}
                handleOnBlur={fecharComentario}
            />
            <Button
                text='Comentar'
                id={`bt_comentar_${pubInfo.idPublicacao}`}
                className='bt_comentar bypass'
                handleOnClick={comentar}
            />
        </div>
    )
}

export default Comentar