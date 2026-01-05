import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from "react"
import { MdOutlineTask } from "react-icons/md";
import axios from "../api/axios"


const Dashboard = () => {

  const [workspaces, setWorkspaces] = useState([])


  useEffect(() => {

    const fetchWorkspaces = async () => {

      try {

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces`, { withCredentials: true })
        console.log(res.data.workspaces)
        setWorkspaces(res.data.workspaces)



      } catch (err) {
        console.log(err)
      }
    }

    fetchWorkspaces()
  }, [])

  return (

    <main className="flex-1 overflow-y-auto bg-gray-100 p-5">

      <div className="flex justify-between">
        <div>
          <h1 className="font-bold">Workspaces</h1>
          {/* <p className="text-xs">Manage your projects and collaborate with your team</p> */}
        </div>

        <button className="text-sm bg-black text-white p-1 rounded-md">+ Workspace</button>
      </div>

      <div className="grid grid-cols-1 gap-4">

        {workspaces.map(ws => (

          <div className="flex flex-col bg-white p-4 border border-gray-200 rounded-xl"
            key={ws.index}>

            <div className="border-b border-gray-200">
              <h1 className="font-semibold">{ws.workspaceId.name}</h1>
              <p className="mb-5">{ws.workspaceId.description}</p>
            </div>

            <div className="flex items-center justify-center gap-x-4 text-gray-500 text-xs mt-5">
              <p><MdOutlineTask />Tasks</p>
              <p>Docs</p>
              <p>Members</p>
            </div>

            <div className="text-xs text-gray-500 mt-5">
              {ws.createdAt}
            </div>

          </div>
        ))}
      </div>


    </main>

  )
}

export default Dashboard