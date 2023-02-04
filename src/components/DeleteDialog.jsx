import React from 'react'

const DeleteDialog = ({ setDialog, deleteMemo }) => {
  return (
    <>
    <div className="flex justify-center items-center fixed z-50 p-4 inset-0">
          <div className="relative w-full h-full max-w-md md:h-auto">
              <div className="relative bg-gray-100 rounded shadow border">
                  <button type="button" onClick={() => setDialog(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                      <svg ariaHidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                  <div className="p-6 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full w-12 h-12 mb-3 text-red-300">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      <h3 className="mb-5 text-lg font-normal text-gray-500">本当に削除してもよろしいですか？</h3>
                      <button type="button" onClick={() => deleteMemo()} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                          削除
                      </button>
                      <button type="button" onClick={() => setDialog(false)} className="text-gray-500 bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-300 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">
                        キャンセル
                      </button>
                  </div>
              </div>
          </div>
      </div>
      <div className='fixed inset-0 bg-black opacity-60'></div>
    </>
  )
}

export default DeleteDialog