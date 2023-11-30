import React from "react";
import styles from './Navbar.module.css'
import MiniPerfil from '../../components/miniPerfil/MiniPerfil'
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const redirecionar = e => {
        navigate('/' + e.target.getAttribute('redirecionamento'))
    }

    const navBarOpcoes = [
        {
            span: 'Principal',
            i: <i className="fa-solid fa-house"></i>,
            redirecionamento: 'feed'
        },
        {
            span: 'Pesquisar',
            i: <i className="fa-solid fa-magnifying-glass"></i>,
            redirecionamento: 'pesquisar'
        },
        {
            span: 'Notificações',
            i: <i className="fa-regular fa-bell"></i>,
            redirecionamento: 'notificacoes'
        },
        {
            span: 'Configurações',
            i: <i className="fa-solid fa-gear"></i>,
            redirecionamento: 'configuracoes'
        },
        {
            span: 'Mensagens',
            i: <i className="fa-regular fa-message"></i>,
            redirecionamento: 'mensagens'
        }
    ]

    return (
        <div className={styles.nav}>
            <div className={styles.logo}>Blunt</div>
            <div className={styles.navegacao}>
                {navBarOpcoes.map((opcao, i) => {
                    return (
                        <div key={i} onClick={redirecionar} redirecionamento={opcao.redirecionamento} className={styles.opcao_navbar}>
                            {opcao.i}
                            <span>{opcao.span}</span>
                        </div>
                    )
                })}
            </div>
            <MiniPerfil />
        </div>
    )
}

export default Navbar