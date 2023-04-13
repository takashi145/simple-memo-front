import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {axiosClient as axios } from '../api/axios';
import InputError from '../components/InputError';
import useAuthContext from '../context/auth';
import { Input } from 'postcss';

const ResetPassword = () => {
  
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [password_confirmation, setPasswordConfirmation] = useState('');

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

    try {
      await axios.post('/reset-password', { email, token, password, password_confirmation});
      toast.success('パスワードを変更しました');
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
        <div className="container max-w-lg px-5 py-24 mx-auto flex">
          <form onSubmit={handleSubmit} className="mx-auto bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-3 font-medium title-font">パスワード再設定</h2>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">メールアドレス</label>
              <Input
                type="email" 
                id="email" 
                name="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                placeholder="メールアドレス"
              />
              <InputError errors={errors.email} />
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">新しいパスワード</label>
              <Input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                placeholder="パスワード"
              />
              <InputError errors={errors.password} />
            </div>
            <div className="relative mb-8">
              <label className="leading-7 text-sm text-gray-600">確認用パスワード</label>
              <Input 
                type="password" 
                id="password_confirmation" 
                name="password_confirmation" 
                value={password_confirmation}
                onChange={(e) => {setPasswordConfirmation(e.target.value)}}
                placeholder="確認用パスワード"
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