import React from 'react'
import { BsPersonPlus } from "react-icons/bs";
const Team = () => {



  return (

    <div className='bg-gray-50 w-full p-5 flex flex-col border-b border-gray-400 overflow-y-auto'>

      <div className=''>
        <div>
          <h1 className='text-xl font-semibold'>Team Members</h1>
          <p className='text-gray-600 text-sm mt-1'>number of members</p>
        </div>

        <div className='flex justify-center mt-5'>
          <button className='bg-gray-900 text-white py-2 rounded-md text-md w-full flex items-center justify-center gap-x-2'><BsPersonPlus />Invite Member</button>
        </div>

      </div>
    </div>
  )


}

export default Team