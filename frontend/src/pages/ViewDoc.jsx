import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "../api/axios"
import { WiStars } from "react-icons/wi";


const ViewDoc = () => {

    const [document, setDocument] = useState({
        title: "",
        content: ""
    })

    const [isLoading, setIsLoading] = useState(false)
    const [AISummary, setAISummary] = useState("")

    const { docId, workspaceId } = useParams()



    const fetchDocument = async () => {
        try {

            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${workspaceId}/documents/${docId}`, { withCredentials: true })
            setDocument(res.data.document)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchDocument()
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target

        setDocument((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }


    const handleSubmit = async (e) => {

        e.preventDefault()
        try {

            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${workspaceId}/documents/${docId}`, {
                title: document.title,
                content: document.content
            }, { withCredentials: true })
            console.log(res)

        } catch (err) {
            console.log(err)
        }
    }


    const getSummary = async () => {

        setIsLoading(true)

        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${workspaceId}/documents/${docId}/summary`, { withCredentials: true })
            console.log(res)
            setAISummary(res.data.response)

        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <div className='px-4 py-2  flex flex-col w-full'>



            <div className='w-full mt-3'>
                <form className=''
                    onSubmit={handleSubmit}>
                    <div className='flex px-2 mb-3 justify-between'>
                        <input className='w-1/2 outline-none text-xl'
                            placeholder='title'
                            value={document.title}
                            name="title"
                            type="text"
                            onChange={handleChange}
                        ></input>

                        <button className=" font-semibold  text-purple-700 text-sm flex border border-purple-300 w-1/2 rounded-md px-2 py-1 justify-center "
                            type="button"
                            onClick={getSummary}>
                            <WiStars className="text-xl" />{isLoading ? "Summarizing..." : "AI Summarize"}</button>

                    </div>

                    {AISummary && (
                        <div className="mt-3 p-3 border border-purple-200 bg-purple-50 rounded-md mb-3">
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Summary:</span> {AISummary}
                            </p>
                        </div>
                    )}

                    <textarea
                        className="w-full outline-none h-[60vh] bg-white border-2 p-2 border-gray-300 rounded-lg"
                        placeholder='content'
                        name="content"
                        type="text"
                        value={document.content}
                        onChange={handleChange}
                    ></textarea>

                    <button className="border  px-2  py-1 rounded-sm w-full border-gray-300 mt-1"
                        type="submit">Save Changes</button>
                </form>
            </div>


        </div>
    )
}

export default ViewDoc