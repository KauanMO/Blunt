import { React, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Rightside from '../../components/rightside/Rightside'
import styles from './Pesquisar.module.css'
import Input from '../../components/input/Input'
import Pesquisa from '../../components/pesquisa/Pesquisa'

function Pesquisar() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([])
    const [resultadoPesquisaPubs, setResultadoPesquisaPubs] = useState([])

    const pesquisar = async () => {
        let valorPesquisa = document.querySelector('#iPesquisa').value, resultadosPesquisa = document.querySelector('.resultados_pesquisa_container')

        if (valorPesquisa.length < 3) {
            resultadosPesquisa.classList.add('none')
            return
        }

        const resPesquisaUsuario = await fetch(`/usuarios/pesquisar/${valorPesquisa}`, {
            headers: {
                token_auth: localStorage.getItem('jwt')
            }
        })
        const pesquisaUsuario = await resPesquisaUsuario.json()
        setResultadoPesquisa(pesquisaUsuario)

        resultadosPesquisa.classList.remove('none')
    }

    const pesquisarPubs = async () => {
        let valorPesquisa = document.querySelector('#iPesquisa').value

        const resPesquisaPub = await fetch(`/publicacoes/pesquisar/${valorPesquisa}`, {
            headers: {
                token_auth: localStorage.getItem('jwt')
            }
        })
        const pesquisarPub = await resPesquisaPub.json()
        setResultadoPesquisaPubs(pesquisarPub)
    }

    return (
        <div className={styles.pesquisar_container}>
            <Navbar />
            <Input name={'iPesquisa'} handleOnChange={pesquisar} className={'pesquisar w_30p mt_1rem'} />
            <Pesquisa pesquisarPubs={pesquisarPubs} resPesquisa={resultadoPesquisa} className={'none'} />
            <Rightside />
        </div>
    )
}

export default Pesquisar