import React from 'react'

const Button = ({color, text, clickHandler}) => {
    return (
        <button onClick={clickHandler} className='btn' style={{backgroundColor: color}}>{text}</button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

export default Button
