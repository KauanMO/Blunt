import { React } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Rightside from '../../components/rightside/Rightside'
import styles from './Pesquisar.module.css'
import Input from '../../components/input/Input'

function Pesquisar() {
    const pesquisar = async () => {
        const resPesquisaUsuario = await fetch(`/usuarios/buscarUsuario/username/${document.querySelector('#iPesquisa').value}`)
        const pesquisaUsuario = await resPesquisaUsuario.json()
        
        console.log(pesquisaUsuario)
    }

    return (
        <div className={styles.pesquisar_container}>
            <Navbar />

            <Input name={'iPesquisa'} handleOnChange={pesquisar} className={'pesquisar w_30p mt_1rem'} />

            <Rightside />
        </div>
    )
}

export default Pesquisar