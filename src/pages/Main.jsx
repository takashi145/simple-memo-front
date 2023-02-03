import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Sidebar from '../components/Sidebar';
import EditorToolbar, { modules, formats } from '../components/EditorToolbar';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

function Main() {

  const [title, setTitle] = useState('');

  const [value, setValue] = useState('');

  const [memos, setMemos] = useState([]);

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
      setValue(memo.body);
    }catch(e) {
      if(e.response.status === 404) {
        navigate('/')
      }
    }
    
  }

  return (
    <>
    <Sidebar 
      items={memos}
    />
    <div className='w-full flex justify-center'>
      <form className='mx-3 mt-3 w-full md:w-5/6 lg:w-1/2'>
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
            value={value} 
            onChange={setValue} 
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