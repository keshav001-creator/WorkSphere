import { useContext } from 'react'
import {WorkspaceContext} from "../context/WorkspaceContext"
import WorkspaceNav from './WorkspaceNav'



const WorkspaceHeader = () => {

    const { workspace } = useContext(WorkspaceContext)
    // console.log(workspace?.name)

    return (    

        <div className='px-5 py-7 border-b border-gray-300'>

            <div className=''>
                <h1 className='text-2xl font-semibold'>{workspace?.name}</h1>
                <p className='text-sm text-gray-500 mt-3' >{workspace?.description}</p>
            </div>

        </div>
    )


}

export default WorkspaceHeader