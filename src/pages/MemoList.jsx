import {axiosClient as axios} from '../api/axios';
import React, { useEffect, useState } from 'react'
import TimeDiff from '../utils/time-diff';
import { Link } from 'react-router-dom';

const About = () => {

  const [memos, setMemos] = useState([]);

  useEffect(() => {
    getMemos();
  }, []);

  const getMemos = async () => {
    const res = await axios.get('/api/memo');
    console.log(res)
    setMemos(res.data.data);
  }
  return (
    <div className='m-8 max-w-7xl '>
      <h3 className='text-xl mb-3'>メモ一覧</h3>
      <div className='flex flex-wrap'>
        {
            memos.map((memo) => {
              return (
                <div className='w-full sm:w-1/2 lg:w-1/3'>
                  <Link 
                    to={`/memo/${memo.id}`} 
                    key={memo.id} 
                    class="hover:ring-2 m-3 block p-3 bg-gray-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100"
                  >
                      <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900">{ memo.title }</h5>
                      <p class="font-normal text-sm text-gray-700 text-end">{ TimeDiff(memo.updated_at) }</p>
                  </Link>   
                </div>
                
              )
            })
          }
      </div>  
    </div>
    
  )
}

export default About