import { useState, useContext } from "react"
import { useParams } from "react-router-dom";
import { BsPersonPlus } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import axios from "../api/axios"


const Team = () => {


  const [showForm, setShowForm] = useState(false)
  const [Email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const { workspaceId } = useParams()


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${workspaceId}/invite`, {
        email: Email,
        role
      }, { withCredentials: true })
      console.log(res)
      setEmail("")  
      setRole("")

    } catch (err) {
      console.log(err)
    }
  }


  return (

    <>
      <div className={`bg-gray-50 w-full p-5 flex flex-col border-b border-gray-400 overflow-y-auto 
  ${showForm ? "pointer-events-none select-none" : ""}`}>

        <div className=''>
          <div>
            <h1 className='text-xl font-semibold'>Team Members</h1>
            <p className='text-gray-600 text-sm mt-1'>number of members</p>
          </div>

          <div className='flex justify-center mt-5'>
            <button className='bg-gray-900 text-white py-2 rounded-md text-md w-full flex items-center justify-center gap-x-2'
              onClick={() => setShowForm(true)}
            ><BsPersonPlus />Invite Member</button>
          </div>

        </div>




      </div>

      {showForm && (
        <div className="fixed inset-0 z-30 bg-yellow flex justify-center items-center bg-black/50">

          <div className="bg-white h-[95vh] w-[90vw] p-2 rounded-2xl">



            <form className="flex flex-col gap-y-3 flex-1"
              onSubmit={handleSubmit}
            >

              <div className="border-b border-gray-300 p-4 flex justify-between">
                <h1 className="text-lg font-semibold">Invite Team Members</h1>
                <button onClick={() => setShowForm(false)}><RxCross2 className="text-gray-500" /></button>
              </div>

              <div className="flex flex-col mt-2">
                <label className="text-xs font-semibold">Email Address</label>
                <input className="text-sm p-2 bg-white border border-gray-400 outline-0 rounded mt-1"
                  placeholder='Email'
                  required
                  type="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>


              <label>
                <input
                  type="radio"
                  name="role"
                  value="Member"
                  checked={role === "Member"}
                  onChange={() => setRole("Member")}
                /> Member
              </label>

              <label>
                <input
                  type="radio"
                  name="role"
                  value="Admin"
                  checked={role === "Admin"}
                  onChange={() => setRole("Admin")}
                /><MdOutlineAdminPanelSettings /> Admin
              </label>


              <div className="flex justify-between items-center py-2 gap-x-3">

                <button className="bg-white p-2 border border-gray-300 rounded-lg w-full"
                  onClick={() => setShowForm(false)}
                >Cancel</button>
                <button className="bg-black text-white p-2  rounded-lg w-full"
                >Send Invite</button>

              </div>

            </form>

          </div>

        </div>
      )}
    </>
  )


}

export default Team