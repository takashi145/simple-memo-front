import React from 'react'

const InputError = ({ errors }) => {
  return (
    <>
      {errors && (
        <ul>
          {errors.map((error, index) => (
            <li key={index} className='text-red-400'>{ error }</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default InputError