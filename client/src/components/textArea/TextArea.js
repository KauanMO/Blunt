import './TextArea.css'

function TextArea({ name, className, handleOnFocus, handleOnBlur, placeholder, rows, handleOnChange, maxLength }) {
    return (
        <textarea
            placeholder={placeholder}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            className={className}
            id={name}
            name={name}
            autoComplete='off'
            maxLength={maxLength}
            rows={rows} 
            onChange={handleOnChange}
            spellCheck='false'/>
    )
}

export default TextArea