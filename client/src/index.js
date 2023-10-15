import React from 'react'
import ReactDOM from 'react-dom/client'
import Cadastro from './pages/cadastro/Cadastro'
import CadastroImagem from './pages/cadastroImagem/CadastroImagem'
import Home from './pages/home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'cadastro',
    element: <Cadastro />
  },
  {
    path: 'cadastro-imagem',
    element: <CadastroImagem />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)