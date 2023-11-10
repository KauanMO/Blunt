import { React, useState, useEffect } from 'react'
import Publicacao from '../../components/publicacao/Publicacao'
import styles from './VizPublicacao.module.css'

function VizPublicacao() {
    const [pubInfo, setPubInfo] = useState(null)

    useEffect(() => {
        async function buscarPubInfo(nanoId) {
            const pubRes = await fetch(`http://localhost:5000/publicacoes/bpnid/${nanoId}`)
            const pub = await pubRes.json()

            setPubInfo(pub)
        }

        buscarPubInfo(window.location.href.split('/')[4])
    }, [])

    return (
        <div className={styles.publicacao_container}>
            {pubInfo ? (<Publicacao pubInfo={pubInfo} clicavel={false} container_comentar={false} />) : '...'}
            
        </div>
    )
}

export default VizPublicacao