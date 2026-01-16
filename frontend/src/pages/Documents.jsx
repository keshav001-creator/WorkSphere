import { CgFileDocument } from "react-icons/cg";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { RxPerson } from "react-icons/rx";
import { LuClock } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "../api/axios"



const Documents = () => {

  const [document, setDocument] = useState([])
  const { workspaceId } = useParams()
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteId, setDeleteId] = useState(null)


  const navigate = useNavigate()


  const fetchDocuments = async () => {

    try {

      setLoading(true)
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${workspaceId}/documents`, { withCredentials: true })
      setDocument(res.data.docs)
      // console.log(res.data.docs)

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])



  const confirmDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${workspaceId}/documents/${deleteId}`,
        { withCredentials: true }
      )

      setDocument(prev => prev.filter(doc => doc._id !== deleteId))
      setShowConfirm(false)

    } catch (err) {
      console.log(err)
    }
  }




  return (
    <div className="w-full p-2 flex flex-col bg-gray-50">


      <div className={showConfirm ? "pointer-events-none select-none" : ""}>
        <div className="flex flex-col p-2 mt-3">
          <h1 className="text-xl font-semibold">Documents</h1>
          <button className="w-full bg-gray-950 text-white p-2 rounded-md mt-2"
            onClick={() => navigate(`/workspaces/${workspaceId}/documents/createDocument`)}>+ New Document</button>
        </div>


        {loading ? (
          <p className="text-center mt-10">Loading...</p>
        ) : document.length === 0 ? (
          <div className="text-gray-600 text-center mt-5">
            <p className="font-semibold text-lg">No Documents yet</p>
            <p className="text-sm mt-1">Create Your first Document</p>
          </div>
        ) : (

          <div className="p-2 grid grid-cols-1">
            {document.map(doc =>
              <div className="border mt-5 border-gray-200 rounded-md shadow-sm  px-2 py-4 bg-white "
                onClick={() => navigate(`/workspaces/${workspaceId}/documents/${doc._id}`)}
                key={doc._id}>

                <div className="flex gap-x-3 shrink-0">
                  <div>
                    <CgFileDocument className="text-lg text-gray-500" />
                  </div>

                  <div className="flex-1">
                    <h1 className="font-semibold">{doc.title}</h1>
                    <p className="line-clamp-2 break-word break-all text-gray-600 text-sm font-semibold overflow-hidden">{doc.content}</p>
                    <div className="flex  mt-3 items-center text-xs text-gray-500 gap-x-2">
                      <RxPerson />
                      <p className=""> {doc.createdBy.fullName.firstName} {doc.createdBy.fullName.lastName}</p>

                    </div>

                    <div className="flex justify-between">
                      <div className="text-xs text-gray-500 flex gap-x-2 items-center">
                        <LuClock />
                        <p className="">{doc.updatedAt}</p>
                      </div>

                    </div>


                  </div>
                  <button className="shrink-0 flex items-end"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteId(doc._id)
                      setShowConfirm(true)

                    }}
                  ><RiDeleteBinLine className="text-red-700 text-md" /></button>
                </div>

              </div>
            )}
          </div>

        )}

        {/* <div className="p-2  grid grid-cols-1">
          {document?.length ? (
            document.map(doc =>
              <div className="border mt-5 border-gray-200 rounded-md shadow-sm  px-2 py-4 bg-white "
                onClick={() => navigate(`/workspaces/${workspaceId}/documents/${doc._id}`)}
                key={doc._id}>

                <div className="flex gap-x-3 shrink-0">
                  <div>
                    <CgFileDocument className="text-lg text-gray-500" />
                  </div>

                  <div className="flex-1">
                    <h1 className="font-semibold">{doc.title}</h1>
                    <p className="line-clamp-2 break-word break-all text-gray-600 text-sm font-semibold overflow-hidden">{doc.content}</p>
                    <div className="flex  mt-3 items-center text-xs text-gray-500 gap-x-2">
                      <RxPerson />
                      <p className=""> {doc.createdBy.fullName.firstName} {doc.createdBy.fullName.lastName}</p>

                    </div>

                    <div className="flex justify-between">
                      <div className="text-xs text-gray-500 flex gap-x-2 items-center">
                        <LuClock />
                        <p className="">{doc.updatedAt}</p>
                      </div>

                    </div>


                  </div>
                  <button className="shrink-0 flex items-end"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteId(doc._id)
                      setShowConfirm(true)
                      
                    }}
                  ><RiDeleteBinLine className="text-red-700 text-md" /></button>
                </div>

              </div>
            )
          ) : <p className="text-center mt-10">Loading...</p>}
        </div> */}



      </div>



      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
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
                onClick={() => confirmDelete(deleteId)}
                className="px-3 py-1 bg-red-600 text-white rounded-md w-1/2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

export default Documents