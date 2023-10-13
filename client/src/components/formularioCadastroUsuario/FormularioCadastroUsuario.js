import { useState } from "react";
import styles from './FormularioCadastroUsuario.module.css'
import Input from '../input/Input'

function FormularioCadastroUsuario() {
    const [values, setValues] = useState({
        iUsername: '',
        iNomeExib: '',
        iEmail: '',
        iDtNasc: '',
        iSenha: '',
        iConfirmSenha: '',
    })

    const cadastrarUsuario = (e) => {
        console.log(values)
        e.preventDefault()
    }

    const inputs = [
        {
            id: 1,
            name: 'iUsername',
            type: 'text',
            placeholder: 'Insira seu @',
            errorMessage: 'Seu nome deve conter entre 4-20 caractéres',
            label: 'Nome de usuário'
        },
        {
            id: 2,
            name: 'iNomeExib',
            type: 'text',
            placeholder: 'Como quer ser chamado?',
            errorMessage: 'Seu nome deve conter entre 4-20 caractéres',
            label: 'Nome de exibição'
        },
        {
            id: 3,
            name: 'iEmail',
            type: 'text',
            placeholder: 'Insira seu email',
            errorMessage: 'E-mail inválido',
            label: 'E-mail'
        },
        {
            id: 5,
            name: 'iDtNasc',
            type: 'date',
            placeholder: 'Insira sua data de nascimento',
            errorMessage: 'Não  são permitidos usuários com idade menor que 16 anos',
            label: 'Data de nascimento'
        },
        {
            id: 6,
            name: 'iSenha',
            type: 'password',
            placeholder: 'Insira sua senha',
            errorMessage: 'Sua senha deve conter entre 8-30 caracteres e conter uma letra maiúscula',
            label: 'Senha'
        },
        {
            id: 7,
            name: 'iConfirmSenha',
            type: 'password',
            placeholder: 'Confirme sua senha',
            errorMessage: 'As senhas devem ser idênticas',
            label: 'Confirmar senha'
        }
    ]

    const attValues = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={cadastrarUsuario} className={styles.form_container}>
            {inputs.map((input) => (
                <Input
                    key={input.id}
                    {...input}
                    handleOnChange={attValues}
                    value={values[input.name]}
                />
            ))}
            <button> Cadastrar </button>
        </form>
    )
}


export default FormularioCadastroUsuario