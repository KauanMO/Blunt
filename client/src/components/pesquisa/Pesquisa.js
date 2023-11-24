import React from 'react'
import './Pesquisa.css'
import Imagem from '../imagem/Imagem'
import { useNavigate } from "react-router-dom";

function Pesquisa({ className, resPesquisa, pesquisarPubs }) {
    //resPesquisa = idUsuario, username, fotoPerfilUsuario, nomeExibicaoUsuario
    const navigate = useNavigate()

    return (
        <div className={'resultados_pesquisa_container ' + className}>
            <div className={'resultados_pesquisa'}>
                {resPesquisa[0]
                    ? resPesquisa.map((resultado, i) => {
                        return (
                            <div onClick={() => { navigate(`/${resultado.username}`) }} className={'resultado_pesquisa'} key={i}>
                                <Imagem className={'foto_perfil_pesquisa'} src={resultado.fotoPerfilUsuario} />
                                <div className='username_nomeExib_pesquisa'>
                                    <span style={{ color: 'white' }}>{resultado.nomeExibicaoUsuario}</span>
                                    <span style={{ color: 'var(--cinza)' }}>@{resultado.username}</span>
                                </div>
                            </div>
                        )
                    })
                    : ''
                }
                <div onClick={pesquisarPubs} className={'opcao_pesquisar_pubs'}>
                    <span>Pesquisar publicações com este filtro</span>
                </div>
            </div>
        </ div >
    )
}

export default Pesquisa