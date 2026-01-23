import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "../api/axios"

const ViewTask = () => {

  const [updating, setUpdating] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [fetchError, setFetchError] = useState(null)

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "High",
    status: "Todo",
    assignToMember: ""
  })

  const navigate = useNavigate()

  const { taskId, workspaceId } = useParams()

  const fetchTask = async () => {
    try {

      setFetchError(null)
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${workspaceId}/task/${taskId}`, { withCredentials: true })
      console.log("fetched", res.data.task)

      setTask({
        title: res.data.task.title,
        description: res.data.task.description,
        priority: res.data.task.priority,
        status: res.data.task.status,
        assignToMember: res.data.task.assignTo?.email || ""
      })

    } catch (err) {
      console.log(err)
      setFetchError(err.response?.data?.message || "Failed to get Task details")
    }
  }

  useEffect(() => {
    fetchTask()
  }, [])

  const handleChange = (e) => {

    const { name, value } = e.target
    setTask(prev => ({
      ...prev,
      [name]: value
    })
    )

  }

  const handleSubmit = async (e) => {

    e.preventDefault()
    try {
      setSubmitError(null)
      setUpdating(true)
      const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${workspaceId}/task/${taskId}`,

        {
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          assignToMember: task.assignToMember
        },
        { withCredentials: true }
      )

      navigate(`/workspaces/${workspaceId}/task`)

    } catch (err) {
      console.log(err)
      setSubmitError(err.response?.data?.message || "Failed to Update")

    } finally {
      setUpdating(false)
    }
  }


  return (

    <div className="h-[calc(100vh-60.67px)] w-full px-2">
      <div className="flex flex-col px-4 py-2 bg-white rounded-lg">
        <h1 className="text-xl font-bold text-center mb-2">Task</h1>

        {fetchError ? (
          <p className="text-red-600 text-center mb-2 mt-2">{fetchError}</p>
        ) : <form className="flex flex-col gap-y-2 flex-1"
          onSubmit={handleSubmit}
        >

          <div className="flex flex-col">
            <label className="text-xs font-semibold">Title</label>
            <input className='w-full text-sm outline-none bg-white border px-2 py-1 border-gray-300 rounded-lg mb-2'
              placeholder='title'
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
            ></input>
          </div>

          <div className="flex flex-col ">
            <label className="text-xs font-semibold">Description</label>
            <textarea
              className="w-full text-sm outline-none bg-white border px-2 py-1 border-gray-300 rounded-lg"
              placeholder='brief description about task'
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex flex-col flex-1">
            <label className="text-xs font-semibold ">Status</label>

            <select className="text-sm px-2 py-1 bg-gray-100 rounded-md border border-gray-300 "
              value={task.status}
              name="status"
              onChange={handleChange}><option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

          </div>

          <div className="flex flex-col flex-1">
            <label className="text-xs font-semibold ">Priority</label>

            <select className="text-sm px-2 py-1 bg-gray-100 rounded-md border border-gray-300"
              value={task.priority}
              name="priority"
              onChange={handleChange}  > <option value="High">High</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>

          </div>

          <div className="flex flex-col flex-1">
            <label className="text-xs font-semibold">Assigned to</label>

            <input className='w-full text-sm outline-none bg-white border px-2 py-1 border-gray-300 rounded-lg mb-2'
              type="text"
              name="assignToMember"
              value={task.assignToMember}
              onChange={handleChange}
            ></input>
          </div>

          {submitError && (
            <p className="text-red-600 text-xs text-center">{submitError}</p>
          )}

          <div className="flex gap-x-1  mt-1">
            <button className="px-2  py-1 w-full bg-white border border-gray-400 rounded-md"
              type="button"
              onClick={() => navigate(`/workspaces/${workspaceId}/task`)}
            >Cancel</button>
            <button className=" px-2  py-1 w-full bg-gray-950 text-white rounded-md"
              type="submit"
            >
              {updating ? "updating..." : "Save Changes"}
            </button>
          </div>
        </form>}


      </div>
    </div>
  )
}

export default ViewTask