import React from 'react'
import { useState } from "react"
import Input from '../input/Input'
import './FormularioLoginUsuario.css'

function FormularioLoginUsuario({ id }) {
    const [dados, setDados] = useState({
        iEmailLogin: '',
        iSenhaLogin: ''
    })

    const errorMessage = {
        usuarioNaoEncontrado: 'Usuário não encontrado'
    }

    const inputs = [
        {
            id: 1,
            name: 'iEmailLogin',
            type: 'text',
            placeholder: 'Insira seu email',
            label: 'E-mail',
            className: 'login'
        },
        {
            id: 2,
            name: 'iSenhaLogin',
            type: 'password',
            placeholder: '*******',
            label: 'Senha',
            className: 'login'
        }
    ]

    const cookie = document.querySelector('#cookie_iSenhaLogin')

    const login = e => {
        e.preventDefault()
        cookie.innerText = ''
        fetch(`http://localhost:5000/usuarios/login/${dados.iEmailLogin}/${dados.iSenhaLogin}`).then(res => {
            console.log(res);
            res.json().then(cred => {
                if (cred.login) {
                    sessionStorage.setItem('idUsuario', cred.idUsuario)
                    window.location.href += 'feed'
                } else {
                    cookie.innerText = errorMessage.usuarioNaoEncontrado
                }
            })
        })
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
                <input style={{ display: 'none' }} id="form_login_submit" type="submit"></input>
            </form>
        </div>
    )
}

export default FormularioLoginUsuario