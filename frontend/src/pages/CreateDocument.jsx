import { useState, useEffect } from "react"
import axios from "../api/axios"
import { useParams, useNavigate} from "react-router-dom"


const CreateDocument = () => {

    const {workspaceId}=useParams()

    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const navigate=useNavigate()


    const handleSubmit=async(e)=>{
        e.preventDefault()

        try{
            const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${workspaceId}/documents`,{
                title,
                content
            },{withCredentials:true})

            console.log(res)
        }catch(err){
            console.log(err)
        }

    }

    return (
        <div className="p-2">
            <div className="flex flex-col justify-center items-center">

                <div>
                    <h1 className="text-center text-xl font-semibold ">Create Document</h1>
                </div>
                <form className='p-2 mt-2'
                    onSubmit={handleSubmit}>
                  
                        <input className='w-full outline-none bg-white border-2 p-2 border-gray-300 rounded-lg mb-2'
                            placeholder='title'
                            type="text"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                        ></input>
                   

                    <textarea
                        className="w-full outline-none h-[60vh] bg-white border-2 p-2 border-gray-300 rounded-lg"
                        placeholder='content'
                        type="text"
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                    ></textarea>

                    <div className="flex gap-x-1  mt-1">
                        <button className="px-2  py-1 w-full bg-white border border-gray-400 rounded-md"
                        type="button"
                        onClick={()=>navigate(`/workspaces/${workspaceId}/documents`)}
                        >Cancel</button>
                        <button className=" px-2  py-1 w-full bg-gray-950 text-white rounded-md"
                        type="submit"
                        onClick={()=>navigate(`/workspaces/${workspaceId}/documents`)}
                        >Create Document</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default CreateDocument