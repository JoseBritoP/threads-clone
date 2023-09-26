import React from 'react'

const RightSidebar = () => {
  return (
    <section className='custom-scrollbar scrollbar-w-3 scrollbar-h-3 scrollbar-thumb-rounded-full scrollbar-thumb-gray-500 sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-2 overflow-auto border-l border-l-gray-950 px-0 pb-5 pt-28 max-xl:hidden bg-gray-950'>
      <div className='flex flex-1 flex-col justify-start '>
        <h3 className='text-2xl text-white p-6'>Suggested Communities</h3>
      </div>
      <div className='flex flex-1 flex-col justify-start '>
        <h3 className='text-2xl text-white p-6'>Suggested Users</h3>
      </div>
    </section>
  )
}

export default RightSidebar
