import React, { useEffect, useState } from 'react'

function Sidebar() {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);
  
  return (
    <>
      <button onClick={() => setOpen(true)} className="text-indigo-500 border border-indigo-300 hover:bg-indigo-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium shadow text-sm p-2.5 text-center inline-flex items-center mr-2 lg:ml-8">
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>

      <div className={`${open ? '' : '-translate-x-full'} fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-gray-100 shadow-lg border-r border-gray-200 w-80`}>
        <h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 border-b border-gray-300 pb-4 w-full">メモ一覧</h5>
        <button type="button" onClick={() => setOpen(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
        <p className="mb-3 text-sm text-gray-500 dark:text-gray-400"></p>
        {
          Array(30).fill('').map((_, i) => {
            return (
              <div key={i} className='shadow h-24 bg-white p-3 mb-3 hover:cursor-pointer hover:ring-2'>
                <h3 className='text-lg text-gray-800'>Title{i+1}</h3>
                <div className='flex justify-end items-end text-sm my-5 text-gray-600'>
                  <button className='text-red-400 hover:text-red-600'>削除</button>
                </div>
              </div>  
            )
          })
        }
      </div>
      { open && <div  className='z-10 bg-black opacity-40 fixed inset-0'></div> }
    </>
  )
}

export default Sidebar