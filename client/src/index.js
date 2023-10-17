import React from 'react'
import ReactDOM from 'react-dom/client'
import Cadastro from './pages/cadastro/Cadastro'
import CadastroImagem from './pages/cadastroImagem/CadastroImagem'
import Home from './pages/home/Home'
import Feed from './pages/feed/Feed'
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
  }, 
  {
    path: 'feed',
    element: <Feed />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)