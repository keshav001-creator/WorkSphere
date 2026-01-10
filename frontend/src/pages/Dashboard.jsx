import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from "react"
import { MdOutlineTask } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { AiOutlineTeam } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import axios from "../api/axios"
import { useNavigate } from "react-router-dom";
import socket from "../Socket";


const Dashboard = () => {

  const [workspaces, setWorkspaces] = useState([])
  const [openMenuId ,setOpenMenuId]=useState(false)
  const navigate = useNavigate()


  const handleDelete=async(workspaceId)=>{
    try{

      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${workspaceId}`,{withCredentials:true})

      setWorkspaces(prev=>
        prev.filter(ws=>ws.workspaceId._id !== workspaceId)
      )
      
      setOpenMenuId(null)
    }catch(err){
      console.log(err)
    }
  }

  const fetchWorkspaces = async () => {

      try {

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces`, { withCredentials: true })
        console.log(res.data.workspaces)
        setWorkspaces(res.data.workspaces)

      } catch (err) {
        console.log(err)
      }
    }

  useEffect(() => {

    fetchWorkspaces()

    socket.on("workspaceAdded",fetchWorkspaces)

    return ()=>{
      socket.off("workspaceAdded",fetchWorkspaces)
    }
  }, [])

  return (

    <main className=" bg-gray-50 px-5 py-5 w-full ">

      <div className=" py-5">
        <div className="flex flex-col justify-between mb-5">
          <h1 className="font-semibold text-2xl">Workspaces</h1>
          <p className="text-md mt-1 text-gray-500">Manage your projects and collaborate with your team</p>
        </div>

        <button className="text-sm bg-gray-900 text-white py-2 rounded-md w-full"
          onClick={() => { navigate("/createWorkspace") }}
        >+ New Workspace</button>
      </div>



      <div className="grid grid-cols-1 gap-4 mt-5">

        {workspaces.map(ws => (

          <div className="flex flex-col bg-white p-4 border border-gray-200 rounded-lg"
            key={ws.index}
            onClick={() => navigate(`/workspaces/${ws.workspaceId._id}`)}

          >

            <div className="border-b border-gray-200 flex ">

              {/* <div className="h-2 w-2 bg-gray-100">
              {ws.workspaceId.icon}
            </div> */}

              <div className="flex flex-row justify-between w-full">
                <div>
                  <h1 className="font-semibold">{ws.workspaceId.name}</h1>
                  <p className="mb-5 text-xs text-gray-500">{ws.workspaceId.description}</p>
                </div>

                <div className="text-sm relative">
                  <CiMenuKebab onClick={(e)=>{
                    e.stopPropagation()
                    setOpenMenuId(
                      openMenuId === ws.workspaceId._id ? null : ws.workspaceId._id
                    ) 
                  }}

                  />
                  {openMenuId === ws.workspaceId._id && (
                    
                    <div className="absolute z-30  rounded-md border border-gray-300 bg-white shadow-lg right-2 flex flex-col text-xs top-3 font-semibold">

                      <button className="px-3 py-2"
                      onClick={(e)=>
                       {
                         e.stopPropagation()
                        handleDelete(ws.workspaceId._id)
                       }
                      }
                      >Delete</button>
                    </div>
                  )}

               
                </div>
              </div>

              


            </div>

            <div className="flex items-center justify-center gap-x-10 mt-5">


              <div className="flex flex-col jutify-center items-center">
                <MdOutlineTask className="text-sm" />
                <p className="text-gray-500 text-xs mt-1">Tasks</p>
              </div>

              <div className="flex flex-col jutify-center items-center">
                <GrDocumentText className="text-sm" />
                <p className="text-gray-500 text-xs mt-1">Docs</p>
              </div>

              <div className="flex flex-col jutify-center items-center">
                <AiOutlineTeam className="text-sm" />
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