import React from "react";
import styles from './Navbar.module.css'
import MiniPerfil from '../../components/miniPerfil/MiniPerfil'

function Navbar() {
    const navBarOpcoes = [
        {
            span: 'Principal',
            i: <i className="fa-solid fa-house"></i>,
            path: '/feed'
        },
        {
            span: 'Pesquisar',
            i: <i className="fa-solid fa-magnifying-glass"></i>,
            path: '/pesquisar'
        },
        {
            span: 'Notificações',
            i: <i className="fa-regular fa-bell"></i>,
            path: '/notificacoes'
        },
        {
            span: 'Configurações',
            i: <i className="fa-solid fa-gear"></i>,
            path: '/configuracoes'
        }
    ]

    return (
        <div className={styles.nav}>
            <div className={styles.logo}>Blunt</div>
            <div className={styles.navegacao}>
                {navBarOpcoes.map((opcao, i) => {
                    return (
                        <a href={opcao.path}>
                            <div className={styles.opcao_navbar} key={i}>
                                {opcao.i}
                                <span>{opcao.span}</span>
                            </div>
                        </a>
                    )
                })}
            </div>
            <MiniPerfil />
        </div>
    )
}

export default Navbar