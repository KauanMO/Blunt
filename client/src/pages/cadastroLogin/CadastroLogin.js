import React from 'react'
import styles from './CadastroLogin.module.css'
import '../../Global.css'
import FormularioCadastroUsuario from '../../components/formularioCadastroUsuario/FormularioCadastroUsuario'
import FormularioLoginUsuario from '../../components/formularioLoginUsuario/FormularioLoginUsuario'
import Button from '../../components/button/Button'

function Cadastro() {
  const cadastrarOuEntrar = e => {
    document.querySelector('#form_cadastro_submit').click()
    // e.target.innerText === 'Cadastrar'
    //   ?
    //   : document.querySelector('#form_login').submit()
  }

  const formCadastroParaLogin = () => {
    const formularioCadastro = document.querySelector('#formulario_cadastro')
    const formularioLogin = document.querySelector('#formulario_login')
    const btLoginCadastro = document.querySelector('#bt_login_cadastro')
    const btTrocarForm = document.querySelector('#bt_trocar_form')

    if (btLoginCadastro.innerText === 'Cadastrar') {
      formularioCadastro.style.animation = 'toLogin forwards ease-out 200ms'
      formularioLogin.style.display = 'flex'
      btLoginCadastro.style.color = 'var(--raisin-black)'
      btTrocarForm.style.color = 'white'
      setTimeout(() => {
        btLoginCadastro.innerText = 'Entrar'
        btTrocarForm.innerText = 'Cadastrar'
        formularioLogin.style.animation = 'fadeLogin forwards ease-in 200ms'
      }, 200)
      setTimeout(() => {
        btLoginCadastro.classList = ['button w_50p negative_colored']
        btTrocarForm.classList = ['button w_50p full_colored']
      }, 300)
    } else {
      formularioLogin.style.animation = 'toCadastro forwards ease-out 200ms'
      formularioCadastro.style.display = 'flex'
      btLoginCadastro.style.color = 'white'
      btTrocarForm.style.color = 'var(--raisin-black)'
      setTimeout(() => {
        btLoginCadastro.innerText = 'Cadastrar'
        btTrocarForm.innerText = 'Entrar'
        formularioCadastro.style.animation = 'fadeCadastro forwards ease-in 200ms'
      }, 200)
      setTimeout(() => {
        btLoginCadastro.classList = ['button w_50p full_colored']
        btTrocarForm.classList = ['button w_50p negative_colored']
      }, 300)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo_cadastro}><span>Se cadastre</span></h2>
      <div className={styles.formularios}>
        <FormularioCadastroUsuario id="formulario_cadastro" />
        <FormularioLoginUsuario id="formulario_login" />
      </div>
      <div className={styles.bt_login_cadastro}>
        <Button id='bt_login_cadastro' handleOnClick={cadastrarOuEntrar} className='full_colored w_50p' text='Cadastrar' />
      </div>
      <div className={styles.possui_conta}>
        <span>Já possui conta?</span>
        <Button id="bt_trocar_form" text="Entrar" handleOnClick={formCadastroParaLogin} className='negative_colored w_50p' />
      </div>
    </div>
  )
}

export default Cadastro