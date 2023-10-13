import React from 'react'
import styles from './Input.module.css'

function Input({ label, type, name, placeholder, value, handleOnChange }) {
    return (
        <div className={styles.input_container}>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={handleOnChange}
                autoComplete='off'
            >
            </input>
        </div>
    )
}

export default Input