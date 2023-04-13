import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { axiosClient as axios } from '../api/axios';
import InputError from '../components/InputError';
import useAuthContext from '../context/auth';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';

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
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
        <h2 className="text-gray-900 text-lg mb-3 font-medium title-font">パスワードをお忘れですか</h2>
        { status ? (
          <div className='bg-green-200 p-3 mb-2 ronded'>
            { status }
          </div>
        ): null}
        <div className="relative mb-5">
          <Label value="メールアドレス" />
          <Input
            type="email"
            id="email" 
            name="email"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
          />
          <InputError errors={errors.email} />
        </div>
        <Button 
          type="submit"
          disabled={!email}
          className="text-white bg-indigo-500 hover:bg-indigo-600 text-lg"
        >
          再設定メールを送信
        </Button>
        <div className='mt-4 flex flex-col space-y-2'>
          <Link to="/login" className='text-gray-500 hover:text-gray-800 hover:cursor-pointer hover:underline'>ログインページへ戻る</Link>
        </div>
      </form>
    </>
  )
}

export default ForgotPassword