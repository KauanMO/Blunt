import React from 'react'
import './Pesquisa.css'

function Pesquisa({ className, resPesquisa }) {
    return (
        <div className={'resultados_pesquisa_container ' + className}>
            <div className={'resultados_pesquisa'}>
                {resPesquisa[0]
                    ? resPesquisa.map((resultado, i) => {
                        return (
                            <div key={i}>
                                {resultado.username}
                            </div>
                        )
                    })
                    : ''
                }
            </div>
        </ div>
    )
}

export default Pesquisa