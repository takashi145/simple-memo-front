import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosClient as axios } from '../api/axios';

function Sidebar({ items, setItems }) {

  const [open, setOpen] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  const createMemo = async () => {
    let title = prompt('新しいメモを作成');

    if(title) {
      try {
        const res = await axios.post('/api/memo', { title });
        const new_memo = res.data.data;
        setOpen(false);
        setItems([...items, new_memo])
        navigate(`/memo/${new_memo.id}`);
        toast.success('メモを作成しました');
      }catch(e) {
        alert('メモの作成に失敗しました。');
      }
    }
  }
  
  return (
    <>
      <button onClick={() => setOpen(true)} className="absolute text-indigo-500 border border-indigo-300 hover:bg-indigo-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium shadow text-sm p-2.5 text-center inline-flex items-center mr-2">
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>

      <div className={`${open ? '' : '-translate-x-full'} fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-gray-100 shadow-lg border-r border-gray-200 w-80`}>
        <h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 border-b border-gray-300 pb-4 w-full">メモ一覧</h5>
        <button type="button" onClick={() => setOpen(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
        <div className='mb-4'>
          <button onClick={() => createMemo()} className='flex justify-center text-sm items-center text-white bg-indigo-400 hover:bg-indigo-600 w-full py-1.5 shadow rounded'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            追加
          </button>
        </div>
        <p className="mb-3 text-sm text-gray-500 dark:text-gray-400"></p>
        {
          items.map((item) => {
            return (

              item.id == id ? (
                <div className="shadow-none ring-2 ring-indigo-400 rounded block h-24 bg-blue-100 p-3 mb-3">
                  <h3 className='text-lg text-gray-800'>{item.title}</h3>
                </div>
              ): (
                <Link 
                  to={`/memo/${item.id}`} 
                  key={item.id} 
                  onClick={() => setOpen(false)}
                  className={`block shadow h-24 bg-white p-3 mb-3 hover:cursor-pointer hover:ring-2`}
                >
                  <h3 className='text-lg text-gray-800'>{item.title}</h3>
                </Link>  
              )
              
            )
          })
        }
      </div>
      { open && <div onClick={() => setOpen(false)} className='z-10 bg-black opacity-40 fixed inset-0'></div> }
    </>
  )
}

export default Sidebar