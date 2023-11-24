import React from 'react'
import ReactDOM from 'react-dom/client'
import CadastroLogin from './pages/cadastroLogin/CadastroLogin'
import CadastroImagem from './pages/cadastroImagem/CadastroImagem'
import Feed from './pages/feed/Feed'
import Perfil from './pages/perfil/Perfil'
import VizPublicacao from './pages/vizPublicacao/VizPublicacao'
import Pesquisar from './pages/pesquisar/Pesquisar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CadastroLogin />
  },
  {
    path: 'cadastro-imagem',
    element: <CadastroImagem />
  },
  {
    path: 'feed',
    element: <Feed />
  },
  {
    path: 'pesquisar',
    element: <Pesquisar />
  },
  {
    path: '/:usuario',
    element: <Perfil />
  },
  {
    path: '/:usuario/:idPublicacao',
    element: <VizPublicacao />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)