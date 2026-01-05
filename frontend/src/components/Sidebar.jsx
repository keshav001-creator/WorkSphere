import { MdWorkspacesFilled } from "react-icons/md";
import {NavLink} from "react-router-dom"

const Sidebar = () => {


    return (

        <div className="w-screen bg-gray-100 p-2 sticky bottom-0 z-30">


            {/* <div className='hidden items-center justify-center gap-x-1 lg:gap-x-2'>
                <MdWorkspacesFilled className='text-md text-gray-500 lg:text-3xl' />
                <h1 className='font-bold  text-lg lg:text-2xl'>WorkSphere</h1>
            </div> */}

            <nav className="flex gap-2 items-center justify-center">
                <NavLink to="/dashboard">Workspaces</NavLink>
                <NavLink to="/tasks">Task</NavLink>
                <NavLink to="/documents">Documents</NavLink>
                <NavLink className="text-red-500"
                to="/logout">Logout</NavLink>
            </nav>


        

        </div>
    )
}

export default Sidebar