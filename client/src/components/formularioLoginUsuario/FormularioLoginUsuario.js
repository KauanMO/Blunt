import React from 'react'
import { useState } from "react"
import Input from '../input/Input'
import './FormularioLoginUsuario.css'

function FormularioLoginUsuario({ id }) {
    const [dados, setDados] = useState({
        iEmail: '',
        iSenha: ''
    })

    const inputs = [
        {
            id: 1,
            name: 'iUsername',
            type: 'text',
            placeholder: 'Insira seu email',
            label: 'E-mail',
            className: 'login'
        },
        {
            id: 2,
            name: 'iSenha',
            type: 'password',
            placeholder: '*******',
            label: 'Senha',
            className: 'login'
        }
    ]

    const login = () => {

    }

    const attDados = e => {
        setDados({ ...dados, [e.target.name]: e.target.value })
    }

    return (
        <div id={id} className='form_login_container'>
            <form onSubmit={login}>
                <div>
                    {inputs.map(input => (
                        <div key={input.id} className='input_container'>
                            <Input
                                key={input.id}
                                {...input}
                                handleOnChange={attDados}
                                value={dados[input.name]}
                            />
                        </div>
                    ))}
                </div>
            </form>
        </div>
    )
}

export default FormularioLoginUsuario