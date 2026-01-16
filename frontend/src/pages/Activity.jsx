import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "../api/axios"


const Activity = () => {


  const { workspaceId } = useParams()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)

  function timeAgo(dateString) {
    const now = new Date()
    const created = new Date(dateString)
    const diffMs = now - created

    const seconds = Math.floor(diffMs / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) return "Just now"
    if (minutes < 60) return `${minutes} min ago`
    if (hours < 24) return `${hours} hr ago`
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days} days ago`

    return created.toLocaleDateString()
  }


  const fetchLogs = async () => {

    try {
      setLoading(true)
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${workspaceId}/activityLog`, { withCredentials: true })
      setLogs(res.data.logs)
      // console.log(res)

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchLogs()
  }, [])



  return (

    <div className="p-4 w-full bg-gray-50">
      <h1 className="text-center text-lg font-semibold mt-2 mb-5">Activity logs</h1>


      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : logs.length === 0 ? (
        <div className="text-gray-600 text-center mt-10">
          <p className="font-semibold text-lg">No Logs yet</p>
        </div>
      ) : (
        logs.map(log => (
          <div key={log.index}
            className="flex gap-x-1 items-center border border-gray-200 shadow-sm p-2 mt-2 rounded-lg bg-white">


            <div className="flex w-12 justify-center items-center shrink-0">
              <img className="h-8 w-8  rounded-full object-cover bg-gray-200"
                src={`${log.actor.avatar}`}></img>
            </div>

            <div className="flex flex-col justify-end flex-1">
              <div >
                <p className=" text-gray-500 text-sm"><span className="font-semibold text-black">{log.actor.fullName.firstName} {log.actor.fullName.lastName} </span>{log.message}</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">{timeAgo(log.createdAt)}</p>
            </div>

          </div>
        ))
      )}


      {/* {logs?.length ? (

        logs.map(log => (
          <div key={log.index}
            className="flex gap-x-1 items-center border border-gray-200 shadow-sm p-2 mt-2 rounded-lg bg-white">


            <div className="flex w-12 justify-center items-center shrink-0">
              <img className="h-8 w-8  rounded-full object-cover bg-gray-200"
                src={`${log.actor.avatar}`}></img>
            </div>

            <div className="flex flex-col justify-end flex-1">
              <div >
                <p className=" text-gray-500 text-sm"><span className="font-semibold text-black">{log.actor.fullName.firstName} {log.actor.fullName.lastName} </span>{log.message}</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">{timeAgo(log.createdAt)}</p>
            </div>

          </div>
        ))

      ) : (<p className="text-center mt-10">loading...</p>)} */}
    </div>
  )
}

export default Activity