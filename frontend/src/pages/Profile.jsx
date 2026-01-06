import { FaArrowLeft } from "react-icons/fa";
import {useState, useContext, useEffect} from "react"
import { UserContext } from "../context/UserContext";


const Profile = () => {

  const {user}=useContext(UserContext)


  return (


    <div className='min-h-screen bg-amber-50'>

      <div className="">
        <div className="flex items-center gap-x-2 bg-gray-200 p-2">
          <FaArrowLeft className="text-xs"/>
          <h1>Edit Profile</h1>
        </div>


        <div className="flex flex-col items-center mt-10">

          <img className="rounded-full h-20 w-20 "
          src={user?.avatar}></img>

          {/* < */}



        </div>


      </div>



    </div>
  )
}

export default Profile