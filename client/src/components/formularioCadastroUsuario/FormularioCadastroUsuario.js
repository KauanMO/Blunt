import { useState } from "react";
import styles from './FormularioCadastroUsuario.module.css'
import Input from '../input/Input'
import Button from '../button/Button'

function FormularioCadastroUsuario() {
    const [dados, setDados] = useState({
        iUsername: '',
        iNomeExib: '',
        iEmail: '',
        iDtNasc: '',
        iSenha: '',
        iConfirmSenha: '',
    })

    const validarUsername = username => {
        document.querySelector('#cookie_iUsername').innerText = ''
        return username.length >= 5 && username.length <= 20
    }

    const validarNomeExib = nomeExib => {
        document.querySelector('#cookie_iNomeExib').innerText = ''
        if (nomeExib !== '' && (nomeExib.length < 2 || nomeExib.length > 30)) { return false }
        if (nomeExib === '') { dados.iNomeExib = dados.iUsername }
        return true
    }

    const validarEmail = email => {
        document.querySelector('#cookie_iEmail').innerText = ''
        return /\S+@\S+\.\S+/.test(email)
    }

    const validarDtNasc = dtNasc => {
        document.querySelector('#cookie_iDtNasc').innerText = ''
        dtNasc = Number(dtNasc.slice(0, 4))
        return ((new Date().getFullYear() - dtNasc) >= 16) && dados.iDtNasc !== ''
    }

    const validarSenha = senha => {
        document.querySelector('#cookie_iSenha').innerText = ''
        return senha.length >= 8 && senha.length <= 30
    }

    const validarConfirmSenha = confirmSenha => {
        document.querySelector('#cookie_iConfirmSenha').innerText = ''
        return confirmSenha === dados.iSenha
    }

    const validarCampos = () => {
        if (!validarUsername(dados.iUsername)) {
            document.querySelector('#cookie_iUsername').innerText = inputs[0].errorMessage
            return false
        }
        if (!validarNomeExib(dados.iNomeExib)) {
            document.querySelector('#cookie_iNomeExib').innerText = inputs[1].errorMessage
            return false
        }
        if (!validarEmail(dados.iEmail)) {
            document.querySelector('#cookie_iEmail').innerText = inputs[2].errorMessage
            return false
        }
        if (!validarDtNasc(dados.iDtNasc)) {
            document.querySelector('#cookie_iDtNasc').innerText = inputs[3].errorMessage
            return false
        }
        if (!validarSenha(dados.iSenha)) {
            document.querySelector('#cookie_iSenha').innerText = inputs[4].errorMessage
            return false
        }
        if (!validarConfirmSenha(dados.iConfirmSenha)) {
            document.querySelector('#cookie_iConfirmSenha').innerText = inputs[5].errorMessage
            return false
        }
        return true
    }

    const verificarUsuarioUnico = () => {
        return fetch(`http://localhost:5000/usuarios/buscarUsuario/username/${dados.iUsername}`).then(res => res.json().then(json => {
            return json.length === 0
        }))
    }

    const verificarEmailUnico = () => {
        return fetch(`http://localhost:5000/usuarios/buscarUsuario/emailUsuario/${dados.iEmail}`).then(res => res.json().then(json => {
            return json.length === 0
        }))
    }

    const cadastrarUsuario = e => {
        e.preventDefault()
        if (!validarCampos()) { return }

        verificarUsuarioUnico().then(usernameUnico => {
            if (usernameUnico) {
                verificarEmailUnico().then(emailUnico => {
                    if (emailUnico) {
                        fetch('http://localhost:5000/usuarios/cadastrar', {
                            method: 'POST',
                            headers: { 'Content-type': 'application/json' },
                            body: JSON.stringify({
                                usernameServer: dados.iUsername,
                                emailServer: dados.iEmail,
                                senhaServer: dados.iSenha,
                                nomeExibServer: dados.iNomeExib,
                                dtNascServer: dados.iDtNasc
                            })
                        }).then(res => {
                            if (res.ok) {
                                res.json().then(cadastro => {
                                    sessionStorage.setItem('idUsuario', cadastro.insertId)
                                    window.location.href = '/cadastro-imagem'
                                })
                            }
                        }).catch(e => {
                            console.log(e)
                        })
                    } else {
                        document.querySelector('#cookie_iEmail').innerText = 'E-mail já cadastrado'
                    }
                })
            } else {
                document.querySelector('#cookie_iUsername').innerText = 'Nome de usuário indisponível'
            }
        })
    }

    const inputs = [
        {
            id: 1,
            name: 'iUsername',
            type: 'text',
            placeholder: 'Insira seu @',
            errorMessage: 'Deve conter entre 4-20 caracteres',
            label: 'Nome de usuário',
            className: 'cadastro',
            required: true
        },
        {
            id: 2,
            name: 'iNomeExib',
            type: 'text',
            placeholder: 'Como quer ser chamado?',
            errorMessage: 'Deve conter entre 2-30 caractéres',
            label: 'Nome de exibição',
            className: 'cadastro',
            required: false
        },
        {
            id: 3,
            name: 'iEmail',
            type: 'text',
            placeholder: 'Insira seu email',
            errorMessage: 'E-mail inválido',
            label: 'E-mail',
            className: 'cadastro',
            required: true
        },
        {
            id: 5,
            name: 'iDtNasc',
            type: 'date',
            placeholder: 'Insira sua data de nascimento',
            errorMessage: 'Não são permitidos usuários com idade menor que 16 anos',
            label: 'Data de nascimento',
            className: 'cadastro',
            required: true
        },
        {
            id: 6,
            name: 'iSenha',
            type: 'password',
            placeholder: 'Insira sua senha',
            errorMessage: 'Sua senha deve conter entre 8-30 caracteres e conter uma letra maiúscula',
            label: 'Senha',
            className: 'cadastro',
            required: true
        },
        {
            id: 7,
            name: 'iConfirmSenha',
            type: 'password',
            placeholder: 'Confirme sua senha',
            errorMessage: 'As senhas devem ser idênticas',
            label: 'Confirmar senha',
            className: 'cadastro',
            required: true
        }
    ]

    const attDados = e => {
        setDados({ ...dados, [e.target.name]: e.target.value })
    }

    return (
        <div className={styles.form_container}>
            <form onSubmit={cadastrarUsuario}>
                {inputs.map(input => (
                    <Input
                        key={input.id}
                        {...input}
                        handleOnChange={attDados}
                        value={dados[input.name]}
                        required={input.required}
                    />
                ))}
                <Button className='full_colored w_80p' text='Cadastrar' />
            </form>
            <div className={styles.possui_conta}>
                <span>Já possui conta?</span>
                <Button text="Entrar" className='negative_colored w_80p' />
            </div>
        </div>
    )
}

export default FormularioCadastroUsuario