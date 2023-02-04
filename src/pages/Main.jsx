import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Sidebar from '../components/Sidebar';
import EditorToolbar, { modules, formats } from '../components/EditorToolbar';
import {axiosClient as axios} from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputError from '../components/InputError';
import DeleteDialog from '../components/DeleteDialog';

function Main() {
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [memos, setMemos] = useState([]);
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getMemos();
  }, []);

  useEffect(() => {
    getMemo();
  }, [id]);

  const getMemos = async () => {
    const res = await axios.get('/api/memo');
    setMemos(res.data.data);
  }

  const getMemo = async () => {
    setTitle('');
    setBody('');
    if(!id) return;
    try {
      const res = await axios.get(`/api/memo/${id}`);
      const memo = res.data.data;
      setTitle(memo.title);
      setBody(memo.body);
    }catch(e) {
      if(e.response.status === 404) {
        navigate('/memo')
      }
    }
  }

  const saveMemo = async () => {
    if(loading) return;

    setLoading(true);
    setErrors([]);
    try {
      if(id) {
        await axios.put(`/api/memo/${id}`, { title, body });
      }else {
        const res = await axios.post('/api/memo', { title, body });
        const new_memo = res.data.data;
        setMemos([...memos, new_memo]);
        navigate(`/memo/${new_memo.id}`);
      }
      toast.success('保存しました');
    }catch(e) {
      if(e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }

  const deleteMemo = async () => {
    await axios.delete(`/api/memo/${id}`);
    setMemos(
      memos.filter((memo) => (memo.id != id))
    );
    setTitle('');
    setBody('');
    setDialog(false);
    toast.error('メモを削除しました');
    navigate('/memo');
  }

  return (
    <>
      <Sidebar 
        items={memos}
      />
      <div className='w-full flex justify-center'>
        <form className='mx-3 mt-14 w-full md:w-5/6 lg:w-1/2'>
          <div className='flex justify-end mb-4'>
            <button 
              type="button" 
              onClick={saveMemo} 
              disabled={!title || loading}
              className={`
                ${title && !loading ? 'shadow-lg hover:text-white hover:bg-green-600 focus:outline-none focus:ring-green-300' : 'line-through'}
                text-green-500 border border-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2
              `}
            >
              Save
            </button>
            
            { id && (
              <button 
                type="button" 
                onClick={() => setDialog(true)}
                disabled={loading}
                className="shadow-lg text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Delete
              </button>
            )}
          </div>
          <div className="mb-6">
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 block w-full p-3"
                placeholder='タイトル' 
              />
              <InputError errors={errors.title} />
          </div>
          <div className=''>
            <EditorToolbar />
            <ReactQuill 
              theme="snow" 
              value={body} 
              onChange={setBody} 
              className="h-96 max-h-screen bg-white" 
              placeholder='メモ'
              modules={modules}
              formats={formats}
            />
            <InputError errors={errors.body} />
          </div>
        </form>
        <div>
          {dialog ? (
            <DeleteDialog setDialog={setDialog} deleteMemo={deleteMemo} />
          ): (null)}
        </div>
      </div>
    </>
  )
}

export default Main
