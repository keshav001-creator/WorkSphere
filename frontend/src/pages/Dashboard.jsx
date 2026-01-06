import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from "react"
import { MdOutlineTask } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { AiOutlineTeam } from "react-icons/ai";
import axios from "../api/axios"
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  const [workspaces, setWorkspaces] = useState([])
  const navigate=useNavigate()


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

    <main className="overflow-y-auto bg-gray-100 p-5 w-full ">

      <div className=" border-b border-gray-300  py-7 px-3">
        <div className="flex flex-col justify-between mb-5">
          <h1 className="font-semibold text-xl">Workspaces</h1> 
          <p className="text-xs text-gray-500">Manage your projects and collaborate with your team</p>
        </div>

        <button className="text-sm bg-black text-white p-1 rounded-md"
        onClick={()=>{navigate("/createWorkspace")}}
        >+ Workspace</button>
      </div>

      

      <div className="grid grid-cols-1 gap-4 mt-5">

        {workspaces.map(ws => (

          <div className="flex flex-col bg-white p-4 border border-gray-200 rounded-md"
            key={ws.index}
            onClick={()=>navigate(`/workspaces/${ws.workspaceId._id}`)}
            
            >

           <div className="border-b border-gray-200 flex ">

            {/* <div className="h-2 w-2 bg-gray-100">
              {ws.workspaceId.icon}
            </div> */}

             <div className="">
              <h1 className="font-semibold">{ws.workspaceId.name}</h1>
              <p className="mb-5 text-xs text-gray-500">{ws.workspaceId.description}</p>
            </div>


           </div>

            <div className="flex items-center justify-center gap-x-10 mt-5">


              <div className="flex flex-col jutify-center items-center">
                <MdOutlineTask className="text-sm"/>
                <p className="text-gray-500 text-xs mt-1">Tasks</p>
              </div>

              <div className="flex flex-col jutify-center items-center">
                <GrDocumentText  className="text-sm"/>
                <p className="text-gray-500 text-xs mt-1">Docs</p>
              </div>
            
             <div className="flex flex-col jutify-center items-center">
                <AiOutlineTeam  className="text-sm"/>
                <p className="text-gray-500 text-xs mt-1">Members</p>
              </div>
              
            </div>

            <div className="text-xs text-gray-500 mt-5">
             {`Created At:${ws.createdAt}`}
            </div>

          </div>
        ))}
      </div>


    </main>

  )
}

export default Dashboard