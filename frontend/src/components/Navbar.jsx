import { UserContext } from "../context/UserContext"
import { useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { MdWorkspacesOutline } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { LuBell } from "react-icons/lu";

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const isWorkspacePage = location.pathname.startsWith("/workspaces")
  const isProfile = location.pathname.startsWith("/profile")

  const { user } = useContext(UserContext)
  // console.log(user)

  return (

    <div className='fixed top-0 z-30 w-full flex items-center justify-between bg-white p-4 border-b border-gray-300'>

      <div className='flex items-center justify-center gap-x-1 '>

        {isWorkspacePage ? (

          <div>
            <FaArrowLeft className="text-xs"
              onClick={() => navigate("/dashboard")}
            />
            {/* <h1>Back</h1> */}
          </div>


        ) : (
          <div className='flex items-center gap-x-1 lg:gap-x-2'>
           <div className="bg-gray-800 rounded-lg p-1"> <MdWorkspacesOutline className='text-xl text-white lg:text-3xl' /></div>
            <h1 className='font-semibold  text-lg lg:text-2xl'>WorkSphere</h1>
          </div>
        )}
      </div>

      <div className="flex gap-x-4 items-center">
        <LuBell  className="text-xl"/>

        <div className="rounded-full"
          onClick={() => navigate("/profile")}
        >
          <img className="w-7 h-7 rounded-full" src={user?.avatar}></img>
        </div>

      </div>

    </div>
  )
}

export default Navbar