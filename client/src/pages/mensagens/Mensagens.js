import { React, useEffect, useState } from 'react'
import styles from './Mensagens.module.css'
import NavBar from '../../components/navbar/Navbar'
import Rightside from '../../components/rightside/Rightside'
import Modal from '../../components/modal/Modal'

function Mensagens() {
    const SemMensagens = () => {
        return (
            <div className={styles.sem_mensagens_container}>
                <span className={styles.sem_mensagens_span}>Você não possui nenhuma mensagem.</span>
                <span className={styles.sem_mensagens_span}>Mande uma para alguem!</span>
                <i onClick={abrirModalPossiveisMensagens} className={`fa-regular fa-message ${styles.mandar_mensagem_icon}`}></i>
            </div>
        )
    }

    const SemSeguidoresReciprocos = () => {
        return (
            <div className={styles.texto_sem_seguidores_reciprocos}>
                <span>Não foram encontrados seguidores recíprocos</span>
                <i className="fa-regular fa-face-sad-tear"></i>
            </div>
        )
    }

    const ListaPossiveisMensagens = () => {
        const [seguidoresReciprocos, setSeguidoresReciprocos] = useState([])

        useEffect(() => {
            const fetchSeguidoresReciprocos = async () => {
                const resSeguidoresReciprocos = await fetch(`/seguidores/bsr/${sessionStorage.getItem('idUsuario')}`)
                const seguidoresReciprocos = await resSeguidoresReciprocos.json()

                if (!seguidoresReciprocos[0]) {
                    setSeguidoresReciprocos(null)
                    return
                }

                setSeguidoresReciprocos(seguidoresReciprocos)
            }
            fetchSeguidoresReciprocos()
        }, [])

        return (
            <div className={styles.seguidores_reciprocos_container}>
                {!seguidoresReciprocos
                    ? <SemSeguidoresReciprocos />
                    : seguidoresReciprocos.map((seguidor, i) => {
                        return (
                            <div key={i}>
                                {seguidor.username}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const abrirModalPossiveisMensagens = () => {
        document.querySelector('.modal_possiveis_mensagens').style.display = 'flex'
    }

    return (
        <div className={styles.mensagens_container}>
            <Modal className={'modal_possiveis_mensagens'}>
                <ListaPossiveisMensagens />
            </Modal>

            <NavBar />

            <SemMensagens />

            <Rightside />
        </div>
    )
}

export default Mensagens