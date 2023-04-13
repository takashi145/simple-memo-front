import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { axiosClient as axios } from '../api/axios';
import InputError from '../components/InputError';
import useAuthContext from '../context/auth';
import Input from '../components/Input';

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
        <div className="container max-w-lg px-5 md:py-8 mx-auto flex">
          <form onSubmit={handleSubmit} className="mx-auto bg-gray-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-3 font-medium title-font">パスワードをお忘れですか</h2>
            { status ? (
              <div className='bg-green-200 p-3 mb-2 ronded'>
                { status }
              </div>
            ): null}
            <div className="relative mb-5">
              <label className="leading-7 text-sm text-gray-600">メールアドレス</label>
              <Input
                type="email" 
                id="email" 
                name="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
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