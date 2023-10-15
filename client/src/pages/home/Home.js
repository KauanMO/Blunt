import React from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <Link to='/cadastro'>Cadastrar-se</Link>
        </div>
    )
}

export default Home