import React, { useEffect, useState } from 'react'
import styles from './Feed.module.css'
import Publicar from '../../components/publicar/Publicar'
import Publicacao from '../../components/publicacao/Publicacao'
import Navbar from '../../components/navbar/Navbar'
import Rightside from '../../components/rightside/Rightside'
import { useNavigate } from 'react-router-dom'

function Feed() {
    const navigate = useNavigate()
    if (!sessionStorage.getItem('idUsuario')) navigate('/')

    const [feed, setFeed] = useState([])

    useEffect(() => {
        const forYouFetchUrl = `/publicacoes/foryou`;
        const fetchData = async () => {
            try {
                const response = await fetch(forYouFetchUrl)
                const res = await response.json()
                setFeed(res)
            } catch (e) {
                console.log("error", e)
            }
        }

        fetchData()
    }, [])

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.center}>
                <div className={styles.publicar_container}>
                    <Publicar />
                </div>
                {feed[0]
                    ? feed.map((post, i) => {
                        return (<Publicacao key={i} pubInfo={post} />)
                    })
                    : 'loading'
                }
            </div>
            <Rightside />
        </div>
    )
}

export default Feed