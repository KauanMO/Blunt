import React from "react";
import styles from './Navbar.module.css'
import MiniPerfil from '../../components/miniPerfil/MiniPerfil'

function Navbar() {
    return (
        <div className={styles.nav}>
            <MiniPerfil />
        </div>
    )
}

export default Navbar