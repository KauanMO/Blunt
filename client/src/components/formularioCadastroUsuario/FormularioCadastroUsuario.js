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

    const validarUsername = (username) => {
        document.querySelector('#cookie_iUsername').innerText = ''
        if (username.length < 5 || username.length > 20) { return false }
        return true
    }

    const validarNomeExib = (nomeExib) => {
        document.querySelector('#cookie_iNomeExib').innerText = ''
        if (nomeExib !== '' && (nomeExib.length < 2 || nomeExib.length > 30)) { return false }
        if (nomeExib === '') { nomeExib = dados.iUsername }
        return true
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
        return true
    }

    const cadastrarUsuario = (e) => {
        e.preventDefault()
        if (validarCampos()) {

        }
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

    const attDados = (e) => {
        setDados({ ...dados, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={cadastrarUsuario} className={styles.form_container}>
            {inputs.map(input => (
                <Input
                    key={input.id}
                    {...input}
                    handleOnChange={attDados}
                    value={dados[input.name]}
                    required={input.required}
                />
            ))}
            <Button className='submit' text='Cadastrar' />
        </form>
    )
}


export default FormularioCadastroUsuario