import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='text-center mt-32'>
      <div className='text-4xl mb-3'>Not Found</div>
      <Link to="/login" className='text-gray-500 hover:text-gray-700 underline'>←戻る</Link>
    </div>
  )
}

export default NotFound