import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { axiosClient as axios } from '../api/axios';
import InputError from '../components/InputError';
import useAuthContext from '../context/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState([]);

  const [status, setStatus] = useState(null);

  const { csrf } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await csrf();
    setErrors([]);
    setStatus(null);
    try {
      const res = await axios.post('/forgot-password', { email });
      setStatus(res.data.status);
    }catch(e) {
      if(e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  }

  return (
    <>
      <div className="text-gray-600 body-font relative">
        <div className="container px-5 py-32 mx-auto flex">
          <form onSubmit={handleSubmit} className="mx-auto lg:w-1/3 md:w-2/3 bg-gray-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-3 font-medium title-font">パスワードをお忘れですか</h2>
            { status ? (
              <div className='bg-green-200 p-3 mb-2 ronded'>
                { status }
              </div>
            ): null}
            <div className="relative mb-5">
              <label className="leading-7 text-sm text-gray-600">メールアドレス</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
              />
              <InputError errors={errors.email} />
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">再設定メールを送信</button>
            <div className='mt-4 flex flex-col space-y-2'>
              <Link to="/login" className='text-gray-500 hover:text-gray-800 hover:cursor-pointer hover:underline'>ログインページへ戻る</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword