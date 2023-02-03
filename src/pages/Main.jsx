import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Sidebar from '../components/Sidebar';
import EditorToolbar, { modules, formats } from '../components/EditorToolbar';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Main() {

  const [loading, setLoading] = useState(false);

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
    if(!id) return;
    
    try {
      const res = await axios.get(`/api/memo/${id}`);
      const memo = res.data.data;
      setTitle(memo.title);
      setBody(memo.body);
    }catch(e) {
      if(e.response.status === 404) {
        navigate('/')
      }
    }
  }

  const saveMemo = async () => {
    setLoading(true);
    try {
      if(id) {
        await axios.put(`/api/memo/${id}`, { title, body });
      }else {
        const res = await axios.post('/api/memo', { title, body });
        setMemos([...memos, res.data.data]);
      }
      setLoading(false);
      toast.success('保存しました');
    }catch(e) {
      if(e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  }

  const deleteMemo = async () => {
    await axios.delete(`/api/memo/${id}`);
    setMemos(
      memos.filter((memo) => (memo.id != id))
    );
    setTitle('');
    setBody('');
    toast.error('メモを削除しました');
    return navigate('/');
  }

  return (
    <>
      { loading && (
        <div className="z-50 fixed inset-0 flex flex-col justify-center items-center bg-black opacity-50">
          Loading...
          <div className="mt-4 animate-ping h-6 w-6 bg-blue-600 rounded-full"></div>
        </div>
      )}
      <Sidebar 
        items={memos}
      />
      <div className='w-full flex justify-center'>
        <form className='mx-3 mt-3 w-full md:w-5/6 lg:w-1/2'>
          <div className='flex justify-end mt-3'>
            <button type="button" onClick={saveMemo} className="text-green-500 hover:text-white border border-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              Save
            </button>
            { id && (
              <button type="button" onClick={deleteMemo} className="text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                Delete
              </button>
            )}
          </div>
          <div className="mb-3">
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 block w-full p-3"
                placeholder='タイトル' 
              />
          </div>
          <div className='h-screen'>
            <EditorToolbar />
            <ReactQuill 
              theme="snow" 
              value={body} 
              onChange={setBody} 
              className="h-4/5 bg-white" 
              placeholder='メモ'
              modules={modules}
              formats={formats}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default Main
