import { useContext } from 'react'
import {WorkspaceContext} from "../context/WorkspaceContext"
import WorkspaceNav from './WorkspaceNav'



const WorkspaceHeader = () => {

    const { workspace } = useContext(WorkspaceContext)

    return (

        <div className='flex flex-col'>

            <div>
                <h1>{workspace.name}</h1>
                <p>{workspace.description}</p>
            </div>

            <div>
                <WorkspaceNav />
            </div>


        </div>
    )


}

export default WorkspaceHeader