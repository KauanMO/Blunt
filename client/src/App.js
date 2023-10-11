import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  const [usuarios, setUsuarios] = useState([])
  useEffect(() => {
    const listarUsuarios = async () => {
      try {
        const res = await axios.get('/usuarios/listar')
        setUsuarios(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    listarUsuarios()
  }, [])

  return (
    <div>
      {
        usuarios.map((usuario) => (
          <div key={usuario.idUsuario}>{usuario.username}</div>
        ))
      }
    </div>
  )
}

export default App