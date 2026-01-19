import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "../api/axios"

const Task = () => {

  const { workspaceId } = useParams()


  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showConfirm,setShowConfirm]=useState(false)
  const [deleteId,setDeleteId]=useState(null)
  const navigate=useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("Todo")
  const [assign, setAssign] = useState("")
  const [priority, setPriority] = useState("High")


  const fetchTasks = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${workspaceId}/tasks`, { withCredentials: true })
      console.log(res)
      setTasks(res.data.tasks)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${workspaceId}/task`, {
        title,
        description,
        status,
        assignToMember: assign,
        priority
      }, { withCredentials: true })

      setTasks(prev=>[res.data.task,...prev])

      setTitle("")
      setDescription("")
      setStatus("Todo")
      setAssign("")
      setPriority("High")


    } catch (err) {
      console.log(err)
    } finally {
      setShowForm(false)
    }
  }

  const handleDelete = async (taskId) => {

    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${workspaceId}/task/${taskId}`, { withCredentials: true })
      console.log(res)

      setTasks(prev=>prev.filter(task=>task._id !== taskId))



    } catch (err) {
      console.log(err)
    }

  }


  return (
    <div className='p-5  min-h-full w-full bg-gray-50'>

      <div className={showForm ? "pointer-events-none select-none" : ""}>

        <div>
          <h1 className="text-xl font-semibold">Tasks</h1>
          <button className="w-full bg-gray-950 text-white p-2 rounded-md mt-2"
            onClick={() => setShowForm(true)}
          >+ New Task</button>
        </div>

        {loading ? (
          <p className="text-center mt-10">Loading...</p>
        ) : tasks.length === 0 ?
          <div className="text-gray-600 text-center mt-5">
            <p className="font-semibold text-lg">No Tasks yet</p>
            <p className="text-sm mt-1">Create Your first Task</p>
          </div> :
          <div className="grid grid-cols-1 gap-3 mt-10">
            {tasks.map(task => (
              <div className={`flex flex-col border border-gray-300 px-2 py-4 rounded-lg ${task.status === "Todo" ? "bg-gray-50" : task.status === "In Progress" ? "bg-blue-50" : "bg-green-50"}`}
                key={task._id}
                onClick={()=>navigate(`/workspaces/${workspaceId}/${task._id}/Viewtask`)}>
                <div className="mb-2 flex justify-between">
                  <h1 className="text-sm">{task.status}</h1>
                  <button onClick={(e) => {
                    e.stopPropagation()
                    setShowConfirm(true)
                    setDeleteId(task._id)
                  }}><RiDeleteBinLine className="text-red-700" /></button>
                </div>

                <div className="bg-white py-2 px-4 rounded-lg border border-gray-200 shadow-sm mb-5">
                  <div>
                    <h1 className="text-md mb-3 font-semibold">{task.title}</h1>
                    <p className="text-xs text-gray-500 mb-2">{task.description}</p>
                  </div>

                  <h1 className="bg-red-50 border border-red-300 inline-block px-2 py-0.5 rounded-lg text-xs text-red-600">{task.priority}</h1>
                </div>


              </div>
            ))}
          </div>
        }
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-30 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-4 rounded-md w-60">
            <h2 className="font-semibold text-lg">Delete Document</h2>
            <p className="text-sm text-gray-600 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 mt-4 w-full">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 border rounded-md w-1/2 "
              >
                Cancel
              </button>

              <button
                onClick={() => handleDelete(deleteId)}
                className="px-3 py-1 bg-red-600 text-white rounded-md w-1/2"
              >
                Delete
              </button>
            </div>
          </div>

        </div>
      )

      }

      {showForm && (
        <div className="fixed inset-0 z-30 bg-black/40 flex justify-center items-center">

          <div className="flex flex-col px-4 py-2 bg-white w-[95vw] h-[95vh] rounded-lg">
            <h1 className="text-xl font-bold text-center mb-5">Create Task</h1>


            <form className="flex flex-col gap-y-2 flex-1"
              onSubmit={handleSubmit}>

              <div className="flex flex-col">
                <label className="text-xs font-semibold">Title</label>
                <input className='w-full text-sm outline-none bg-white border px-2 py-1 border-gray-300 rounded-lg mb-2'
                  placeholder='title'
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>

              <div className="flex flex-col ">
                <label className="text-xs font-semibold">Description</label>
                <textarea
                  className="w-full text-sm outline-none bg-white border px-2 py-1 border-gray-300 rounded-lg"
                  placeholder='brief description about task'
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-col flex-1">
                <label className="text-xs font-semibold ">Status</label>

                <select className="text-sm px-2 py-1 bg-gray-100 rounded-md border border-gray-300 "
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}>
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>

              </div>

              <div className="flex flex-col flex-1">
                <label className="text-xs font-semibold ">Priority</label>

                <select className="text-sm px-2 py-1 bg-gray-100 rounded-md border border-gray-300"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}>
                  <option value="High">High</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
                </select>

              </div>

              <div className="flex flex-col flex-1">
                <label className="text-xs font-semibold mb-1 ">Assign to</label>

                <input className='w-full text-sm outline-none bg-white border px-2 py-1 border-gray-300 rounded-lg mb-2'
                  placeholder='assign to email'
                  type="text"
                  value={assign}
                  onChange={(e) => setAssign(e.target.value)}
                ></input>
              </div>



              <div className="flex gap-x-1  mt-1">
                <button className="px-2  py-1 w-full bg-white border border-gray-400 rounded-md"
                  type="button"
                  onClick={() => setShowForm(false)}
                >Cancel</button>
                <button className=" px-2  py-1 w-full bg-gray-950 text-white rounded-md"
                  type="submit"
                >Create Task</button>
              </div>
            </form>
          </div>

        </div>
      )}

    </div>
  )
}

export default Task