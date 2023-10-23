import React, { useEffect, useState } from 'react'
import styles from './Feed.module.css'
import Publicar from '../../components/publicar/Publicar'
import Publicacao from '../../components/publicacao/Publicacao'
import Navbar from '../../components/navbar/Navbar'

function Feed() {
    if (!sessionStorage.getItem('idUsuario')) { window.location.href = window.location.origin }

    const [feed, setFeed] = useState([])

    useEffect(() => {
        const forYouFetchUrl = `http://localhost:5000/publicacoes/foryou`;
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
            <div className={styles.right_side}></div>
        </div>
    )
}

export default Feed