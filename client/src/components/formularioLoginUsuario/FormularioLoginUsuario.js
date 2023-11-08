import React from 'react'
import { useState } from "react"
import Input from '../input/Input'
import './FormularioLoginUsuario.css'
import { useNavigate } from "react-router-dom";

function FormularioLoginUsuario({ id }) {
    const navigate = useNavigate();
    const [dados, setDados] = useState({
        iEmailUsernameLogin: '',
        iSenhaLogin: ''
    })

    const errorMessage = {
        usuarioNaoEncontrado: 'Usuário não encontrado'
    }

    const inputs = [
        {
            id: 1,
            name: 'iEmailUsernameLogin',
            type: 'text',
            placeholder: 'Insira seu email ou @',
            label: 'E-mail ou @',
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
        fetch(`http://localhost:5000/usuarios/login/${dados.iEmailUsernameLogin}/${dados.iSenhaLogin}`).then(res => {
            if (res.status === 200) {
                res.json().then(cred => {
                    if (document.querySelector('#manter_conectado').checked) localStorage.setItem('idUsuario', cred.idUsuario)
                    sessionStorage.setItem('idUsuario', cred.idUsuario)
                    localStorage.setItem('jwt', cred.userToken)
                    navigate('/feed')
                })
            } else {
                cookie.innerText = errorMessage.usuarioNaoEncontrado
            }
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
                    <div className='manter_conectado_container'>
                        <Input type='checkbox' name='manter_conectado' label='Manter Conectado' />
                    </div>
                </div>
                <input style={{ display: 'none' }} id="form_login_submit" type="submit"></input>
            </form>
        </div>
    )
}

export default FormularioLoginUsuario