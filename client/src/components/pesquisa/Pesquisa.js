import React from 'react'
import './Pesquisa.css'
import Imagem from '../imagem/Imagem'

function Pesquisa({ className, resPesquisa }) {
    //resPesquisa = idUsuario, username, fotoPerfilUsuario, nomeExibicaoUsuario
    return (
        <div className={'resultados_pesquisa_container ' + className}>
            <div className={'resultados_pesquisa'}>
                {resPesquisa[0]
                    ? resPesquisa.map((resultado, i) => {
                        return (
                            <div className={'resultado_pesquisa'} key={i}>
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
            </div>
        </ div >
    )
}

export default Pesquisa