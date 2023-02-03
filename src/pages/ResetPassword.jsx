import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from '../api/axios';
import InputError from '../components/InputError';
import useAuthContext from '../context/auth';

const ResetPassword = () => {
  
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [password_confirmation, setPasswordConfirmation] = useState('');

  // const [status, setStatus] = useState(null);

  const [errors, setErrors] = useState([]);

  const [searchParams] = useSearchParams();

  const { token } = useParams();

  const { csrf } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    setEmail(searchParams.get('email'));
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await csrf();
    setErrors([]);
    // setStatus(null);

    try {
      await axios.post('/reset-password', { email, token, password, password_confirmation});
      // setStatus(res.data.status);
      navigate('/login');
    }catch(e) {
      if(e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  }

  return (
    <>
      <div className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex">
          <form onSubmit={handleSubmit} className="mx-auto lg:w-1/3 md:w-2/3 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-3 font-medium title-font">パスワード再設定</h2>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                placeholder="メールアドレス"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
              />
              <InputError errors={errors.email} />
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">New Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                placeholder="パスワード"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
              />
              <InputError errors={errors.password} />
            </div>
            <div className="relative mb-8">
              <label className="leading-7 text-sm text-gray-600">Password Confirm</label>
              <input 
                type="password" 
                id="password_confirmation" 
                name="password_confirmation" 
                value={password_confirmation}
                onChange={(e) => {setPasswordConfirmation(e.target.value)}}
                placeholder="確認用パスワード"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
              />
              <InputError errors={errors.password_confirmation} />
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">パスワード再設定</button>
            <div className='mt-4 flex flex-col space-y-2'>
              <Link to="/login" className=' text-gray-500 hover:text-gray-800 hover:cursor-pointer hover:underline'>ログイン</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword