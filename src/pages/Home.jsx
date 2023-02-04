import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='h-full'>
      <div className='text-center mt-24 space-y-6 pb-32'>
        <h1 className=' text-8xl text-gray-800 font-serif'>Memoru</h1>
        <p className='text-2xl font-bold text-gray-700'>シンプルで簡単なメモアプリ</p>
        <div className='pt-14 text-center'>
          <Link 
            to="/login"
            className='text-blue-600 hover:text-white border-2 border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2'
          >
            始める→
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home