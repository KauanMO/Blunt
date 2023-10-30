import React from 'react'
import './DropDownMenu.css'

function DropDownmenu({ opcoes, name }) {
    return <div id={name} className='dropdown_menu'>
        {opcoes[0]
            ? opcoes.map((opcao, i) => {
                return (
                    <div style={opcao.style} key={i}>
                        <span>{opcao.label}</span>
                        {opcao.i}
                    </div>
                )
            }) : ''
        }
    </div>
}

export default DropDownmenu