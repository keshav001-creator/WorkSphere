import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "../api/axios"
import { RxCross2 } from "react-icons/rx";
import { MdWorkspacesFilled } from "react-icons/md";



const CreateWorkspace = () => {


    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()

    const [icon, setIcon] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/workspace`, {
                name,
                description,
                icon
            }, { withCredentials: true }
            )

            console.log(res)

        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className="flex  text-center justify-center h-screen  w-full">


            <div className="w-full p-3">

                {/* <div className='flex items-center justify-between'>
                    <div className="flex items-center gap-x-1">
                        <MdWorkspacesFilled className='text-lg text-gray-400' />
                        <h1 className='font-bold  text-lg'>WorkSphere</h1>
                    </div>
                    <button onClick={() => navigate("/dashboard")}><RxCross2 /></button>
                </div> */}

                <form className="flex flex-col gap-y-3 mt-20 p-4"
                    onSubmit={handleSubmit}>

                    <div className="mb-1">
                        <h1 className="text-xl font-semibold">Create New Workspace</h1>

                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="hidden lg:block">Workspace Name</label>
                        <input className="text-sm p-2 bg-gray-100 border border-gray-400 outline-0 rounded"
                            placeholder='e.g., Marketing Team'
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="hidden lg:block">Description</label>
                        <textarea className="text-sm p-2 bg-gray-100  border border-gray-400 outline-0 rounded"
                            placeholder='Brief description of the workspace'
                            required
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    

                    <div className="flex justify-between gap-x-3">
                        <button className="bg-white text-black  px-2 py-1 rounded-sm border border-gray-300 w-1/2"
                            onClick={() => navigate("/dashboard")}
                        >Cancel</button>

                        <button className="bg-black text-white px-2 py-1 rounded-sm w-1/2"
                        onClick={()=>navigate("/dashboard")}
                        >Create</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default CreateWorkspace