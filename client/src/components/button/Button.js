import React from 'react'
import styles from './Button.module.css'

function Button({ text, id, handleOnClick }) {
    return (
        <button id={id} onClick={handleOnClick}>{text}</button>
    )
}

export default Button