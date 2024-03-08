import { React, useState, useEffect } from 'react'
import Publicacao from '../../components/publicacao/Publicacao'
import styles from './VizPublicacao.module.css'
import Comentario from '../../components/comentario/Comentario'
import Navbar from '../../components/navbar/Navbar'
import Rightside from '../../components/rightside/Rightside'

function VizPublicacao() {
    const [pubInfo, setPubInfo] = useState(null)
    const [comentariosPub, setComentariosPub] = useState({})

    useEffect(() => {
        async function buscarComentarios(pubId) {
            const comentariosRes = await fetch(`/comentarios/lcp/${pubId}`)
            const comentarios = await comentariosRes.json()
            setComentariosPub(comentarios)
        }

        async function buscarPubInfo(nanoId) {
            const pubRes = await fetch(`/publicacoes/bpnid/${nanoId}`)
            const pub = await pubRes.json()
            setPubInfo(pub)

            buscarComentarios(pub.idPublicacao)
        }

        buscarPubInfo(window.location.href.split('/')[4])
    }, [])

    return (
        <div className={styles.publicacao_container}>
            <Navbar />
            {pubInfo ? (<Publicacao pubInfo={pubInfo} clicavel={false} container_comentar={true} />) : '...'}
            <div className={styles.comentarios_container}>
                {comentariosPub[0] ?
                    comentariosPub.map((comentario, i) => {
                        return (<Comentario comentario={comentario} key={i} />)
                    }) : '...'}
            </div>
            <Rightside />
        </div>
    )
}

export default VizPublicacao