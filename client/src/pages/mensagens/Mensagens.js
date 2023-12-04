import { React, useEffect, useState } from 'react'
import styles from './Mensagens.module.css'
import NavBar from '../../components/navbar/Navbar'
import Rightside from '../../components/rightside/Rightside'
import Imagem from '../../components/imagem/Imagem'
import Chat from '../../components/chat/Chat'

function Mensagens() {
    const [usuarioChatAtual, setUsuarioChatAtual] = useState(null)

    const ListaSeguidoresReciprocos = () => {
        const [seguidoresReciprocos, setSeguidoresReciprocos] = useState([])
        useEffect(() => {
            async function fetchSeguidoresReciprocos() {
                const resSeguidoresReciprocos = await fetch(`/seguidores/bsr/${sessionStorage.getItem('idUsuario')}`)
                if (resSeguidoresReciprocos.status !== 200) {
                    setSeguidoresReciprocos([resSeguidoresReciprocos.status])
                    return
                }

                const seguidoresReciprocos = await resSeguidoresReciprocos.json()

                setSeguidoresReciprocos(seguidoresReciprocos)
            }
            fetchSeguidoresReciprocos()
        }, [])

        const abrirChat = e => {
            console.log(e.target)
            setUsuarioChatAtual(e.target.getAttribute('idusuario'))
        }

        return (
            <div className={styles.lista_seguidores_reciprocos}>
                {
                    !seguidoresReciprocos[0]
                        ? 'Buscando seguidores recíprocos...'
                        : seguidoresReciprocos[0].username
                            ? seguidoresReciprocos.map((seguidor, i) => {
                                return (
                                    <div idusuario={seguidor.seguidor} onClick={abrirChat} className={styles.seguidor_reciproco_container} key={i}>
                                        <Imagem className={'foto_perfil_pesquisa ' + styles.foto_perfil_usuario} src={seguidor.fotoPerfilUsuario} />
                                        <div className={styles.username_nomeExibicao_seguidor}>
                                            <span className={styles.nome_exibicao_seguidor}>{seguidor.nomeExibicaoUsuario}</span>
                                            <span className={styles.username_seguidor}>@{seguidor.username}</span>
                                        </div>
                                    </div>
                                )
                            })
                            : 'Sem seguidores recíprocos'
                }
            </div>
        )
    }

    return (
        <div className={styles.mensagens_container}>
            <NavBar />
            <div className={styles.mensagens_main}>
                <ListaSeguidoresReciprocos />

                <Chat usuarioAtual={usuarioChatAtual} />
            </div>

            <Rightside />
        </div>
    )
}

export default Mensagens