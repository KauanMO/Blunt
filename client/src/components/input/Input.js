import React from 'react'
import './Input.css'

function Input({ label, type, name, placeholder, value, handleOnChange, className, required }) {

    return (
        <div className='input_container'>
            <label htmlFor={name}>{label}{required === true ? <span className='campo_obrigatorio'>*</span> : ''}</label>
            <input
                className={className}
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={handleOnChange}
                autoComplete='off'
            >
            </input>
            <span className='cookie_erro' id={'cookie_' + name}></span>
        </div>
    )
}

export default Input