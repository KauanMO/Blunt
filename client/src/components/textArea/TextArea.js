import './TextArea.css'

function TextArea({ name, className, handleOnFocus, handleOnBlur, placeholder, rows, handleOnChange }) {
    return (
        <textarea
            placeholder={placeholder}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            className={className}
            id={name}
            name={name}
            autoComplete='off'
            maxLength='200'
            rows={rows} 
            onChange={handleOnChange}/>
    )
}

export default TextArea