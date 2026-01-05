import { CiBellOn } from "react-icons/ci";
import { UserContext } from "../context/UserContext"
import { useState, useContext } from "react"
import { MdWorkspacesFilled } from "react-icons/md";

const Navbar = () => {

  const { user } = useContext(UserContext)

  return (

    <div className='sticky top-0 z-30 w-full flex items-center justify-between bg-yellow-100 p-2'>


      <div className='flex items-center justify-center gap-x-1 lg:gap-x-2'>
        <MdWorkspacesFilled className='text-md text-gray-500 text-xl' />
        <h1 className='font-bold  text-lg '>WorkSphere</h1>
      </div>

      <div>
        <CiBellOn className="text-xl"
        />
      </div>

    </div>
  )
}

export default Navbar