import React from "react"
import './Modal.css'

function Modal({ className, closeIconOnClick }) {
    return (
        <div className={className + ' modal_container'} >
            <div className='modal_conteudo'>
                <span className='fechar_modal' onClick={closeIconOnClick}>X</span>
            </div>
        </div >
    )
}

export default Modal