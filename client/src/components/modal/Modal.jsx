import { React } from "react"
import './Modal.css'

function Modal({ className, children }) {
    return (
        <div className={className + ' modal_container'} >
            <div className='modal_conteudo'>
                {children}
                <span className='fechar_modal' onClick={() => { document.querySelector(`.${className}`).style.display = 'none' }}>X</span>
            </div>
        </div >
    )
}

export default Modal