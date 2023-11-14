import React from 'react'
import './Button.css'

function Button({ text, id, handleOnClick, className, children }) {
    return (
        <button className={className + ' button'} id={id} onClick={handleOnClick}>{text} {children}</button>
    )
}

export default Button