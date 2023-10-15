import React from 'react'
import styles from './Cadastro.module.css'
import '../../Global.css'
import FormularioCadastroUsuario from '../../components/formularioCadastroUsuario/FormularioCadastroUsuario'

function Cadastro() {
  return (
    <div className={styles.container}>
      <h2 className={styles.titulo_cadastro}><span>Se cadastre</span></h2>
      <FormularioCadastroUsuario />
    </div>
  )
}

export default Cadastro