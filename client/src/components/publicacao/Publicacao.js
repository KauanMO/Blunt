import React, { useState, useEffect } from 'react'
import styles from './Publicacao.module.css'
import Imagem from '../imagem/Imagem'
import FotoPerfil from '../fotoPerfil/FotoPerfil'
import TextArea from '../textArea/TextArea'
import Button from '../button/Button'

function Publicacao({ pubInfo }) {
    // pubInfo = dataPublicacao, fotoPerfilUsuario, fotoPublicacao, nomeExibicaoUsuario, textoPublicacao
    let tempoPubPassado = Math.round((new Date() - new Date(pubInfo.dataPublicacao)) / (1000 * 60))
    if (tempoPubPassado > 1440) { tempoPubPassado = Math.round(tempoPubPassado / 1440) + 'd' }
    if (tempoPubPassado > 60) { tempoPubPassado = Math.round(tempoPubPassado / 60) + 'h' }
    if (tempoPubPassado < 60) { tempoPubPassado = tempoPubPassado + 'm' }

    const [curtido, setCurtido] = useState(null)

    useEffect(() => {
        const url = `http://localhost:5000/curtidas/vc/${sessionStorage.getItem('idUsuario')}/${pubInfo.idPublicacao}`

        const fetchData = async () => {
            try {
                const response = await fetch(url)
                const curtidoRes = await response.json()
                setCurtido(curtidoRes)
            } catch (error) {
                console.log("error", error)
            }
        }

        fetchData()
    }, [pubInfo.idPublicacao])

    const curtirDescurtir = e => {
        fetch(`http://localhost:5000/curtidas/${curtido ? 'descurtir' : 'curtir'}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                fkUsuario: sessionStorage.getItem('idUsuario'),
                fkPublicacao: pubInfo.idPublicacao
            })
        }).then(res => {
            console.log(res)
            if (res.ok) {
                setCurtido(!curtido)
            } else {
                console.log('erro');
            }
        }).catch(e => {
            console.log(e)
        })
    }

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
        <div id={pubInfo.idPublicacao} className={styles.publicacao_container}>
            <div className={styles.topo_pub}>
                <Imagem imageClassName="foto_usuario_pub w_2rem h_2rem" src={pubInfo.fotoPerfilUsuario} />
                <div className={styles.publicacao_textos}>
                    <div className={styles.info_usuario}>
                        <span className={styles.nome_username}>
                            <span className={styles.nome_exibicao}>{pubInfo.nomeExibicaoUsuario}</span>
                            <span className={styles.username}>
                                @{pubInfo.username}
                            </span>
                            <span style={{ color: 'var(--cinza)' }}>•</span>
                            <span className={styles.dataPub}>{tempoPubPassado}</span>
                        </span>
                    </div>
                    <span>{pubInfo.textoPublicacao}</span>
                </div>
            </div>
            {pubInfo.fotoPublicacao ? <Imagem imageClassName="imagem_pub as_fe" src={pubInfo.fotoPublicacao} /> : ''}
            <div className={styles.publicacoes_opcoes}>
                <div onClick={curtirDescurtir} id={'curtir_' + pubInfo.idPublicacao} className={styles.publicacao_opcao_container}>
                    <i className={curtido ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    <span>Curtidas</span>
                </div>
                <div id={'repostar' + pubInfo.idPublicacao} className={styles.publicacao_opcao_container}>
                    <i className="fa-solid fa-repeat"></i>
                    <span>Repostagens</span>
                </div>
                <div id={'comentar' + pubInfo.idPublicacao} className={styles.publicacao_opcao_container}>
                    <i className="fa-regular fa-comment"></i>
                    <span>Comentarios</span>
                </div>
            </div>
            <div id={`comentar_container_${pubInfo.idPublicacao}`} className={styles.comentar_container}>
                <FotoPerfil imageClassName='foto_perfil_com w_2rem h_2rem' />
                <TextArea
                    name={`texto_comentario_${pubInfo.idPublicacao}`}
                    className='w_80p texto_comentario'
                    placeholder='Adicione um comentário'
                    maxLength='155'
                    handleOnFocus={abrirComentario}
                    handleOnBlur={fecharComentario}
                />
                <Button
                    text='Comentar'
                    id={`bt_comentar_${pubInfo.idPublicacao}`}
                    className='bt_comentar'
                    handleOnClick={comentar}
                />
            </div>
        </div>
    )
}

export default Publicacao