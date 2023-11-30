import { React, useEffect, useState } from 'react'
import styles from './Mensagens.module.css'
import NavBar from '../../components/navbar/Navbar'
import Rightside from '../../components/rightside/Rightside'

function Mensagens() {
    const ListaSeguidoresReciprocos = () => {
        const [seguidoresReciprocos, setSeguidoresReciprocos] = useState([])
        useEffect(() => {
            async function fetchSeguidoresReciprocos() {
                const resSeguidoresReciprocos = await fetch(`/seguidores/bsr/${sessionStorage.getItem('idUsuario')}`)
                console.log(resSeguidoresReciprocos)
                if (resSeguidoresReciprocos.status !== 200) {
                    setSeguidoresReciprocos([resSeguidoresReciprocos.status])
                    return
                }

                const seguidoresReciprocos = await resSeguidoresReciprocos.json()

                setSeguidoresReciprocos(seguidoresReciprocos)
            }
            fetchSeguidoresReciprocos()
        }, [])

        return (
            <div className={styles.lista_seguidores_reciprocos}>
                {
                    !seguidoresReciprocos[0]
                        ? 'Buscando seguidores recíprocos...'
                        : seguidoresReciprocos[0].username
                            ? seguidoresReciprocos.map((seguidor, i) => {
                                return (
                                    <div key={i}>
                                        {seguidor.username}
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

            <ListaSeguidoresReciprocos />

            <Rightside />
        </div>
    )
}

export default Mensagens