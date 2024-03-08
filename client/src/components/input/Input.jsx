import React from 'react'
import './Input.css'

function Input({ containerClassName, labelColor, label, type, name, placeholder, value, handleOnChange, className, required, accept, handleOnFocus, handleOnBlur }) {
    return (
        <div className={'label_input ' + containerClassName}>
            <label style={{ color: labelColor }} htmlFor={name}>{label}{required === true ? <span className='campo_obrigatorio'>*</span> : ''}</label>
            <input
                className={className}
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={handleOnChange}
                autoComplete='off'
                accept={accept}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
            >
            </input>
            <span className='cookie_erro' id={'cookie_' + name}></span>
        </div>
    )
}

export default Input