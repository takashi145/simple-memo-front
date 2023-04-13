import React from 'react'

const Button = ({ children, type="button", className="", disabled }) => {
  return (
    <button 
      type={type}
      disabled={disabled}
      className={`
        ${disabled ? 'bg-gray-200 cursor-default' : className}
        py-2 px-6 rounded opacity-80 border-0 focus:outline-none focus:ring-2
      `}
    >
      {children}
    </button>
  )
}

export default Button