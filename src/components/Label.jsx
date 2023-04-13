import React from 'react'

const Label = ({ value, className = "", children, ...props}) => {
  return (
    <label {...props} className={`${className} leading-7 text-sm text-gray-600`}>
      { value ? value : children }
    </label>
  )
}

export default Label