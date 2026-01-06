import WorkspaceHeader from "./WorkspaceHeader"
import WorkspaceNav from "./WorkspaceNav"
import { Outlet } from "react-router-dom"

const WorkspaceLayout = () => {



    return (

        <div className="flex flex-col flex-1 w-full">
            <WorkspaceHeader />
             <WorkspaceNav />
            <div className="flex-1 flex overflow-y-auto ">
                <Outlet />
            </div>
        </div>

    )
}

export default WorkspaceLayout