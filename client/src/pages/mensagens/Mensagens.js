import React from 'react'
import styles from './Mensagens.module.css'
import NavBar from '../../components/navbar/Navbar'
import Rightside from '../../components/rightside/Rightside'

function Mensagens() {

    const SemMensagens = () => {
        return (
            <div className={styles.sem_mensagens_container}>
                <span className={styles.sem_mensagens_span}>Você não possui nenhuma mensagem.</span>
                <span className={styles.sem_mensagens_span}>Mande uma para alguem!</span>
                <i className={`fa-regular fa-message ${styles.mandar_mensagem_icon}`}></i>
            </div>
        )
    }

    return (
        <div className={styles.mensagens_container}>
            <NavBar />

            <SemMensagens />

            <Rightside />
        </div>
    )
}

export default Mensagens