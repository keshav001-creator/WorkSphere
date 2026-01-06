import { CiBellOn } from "react-icons/ci";
import { UserContext } from "../context/UserContext"
import { useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { MdWorkspacesFilled } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const isWorkspacePage = location.pathname.startsWith("/workspaces")
  const isProfile = location.pathname.startsWith("/profile")

  const { user } = useContext(UserContext)
  // console.log(user)

  return (

    <div className='sticky top-0 z-30 w-full flex items-center justify-between bg-white p-2 border-b border-gray-300'>

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
            <MdWorkspacesFilled className='text-md text-gray-500 lg:text-3xl' />
            <h1 className='font-bold  text-sm lg:text-2xl'>WorkSphere</h1>
          </div>
        )}
      </div>

      <div className="flex gap-x-2">
        <CiBellOn className="text-xl"/>

        <div className="rounded-full"
          onClick={() => navigate("/profile")}
        >
          <img className="w-5 h-5 rounded-full" src={user?.avatar}></img>
        </div>

      </div>

    </div>
  )
}

export default Navbar