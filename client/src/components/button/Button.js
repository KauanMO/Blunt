import React from 'react'
import './Button.css'

function Button({ text, id, handleOnClick, className }) {
    return (
        <button className={className + ' button'} id={id} onClick={handleOnClick}>{text}</button>
    )
}

export default Button