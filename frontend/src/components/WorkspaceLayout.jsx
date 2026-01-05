import WorkspaceHeader from "./WorkspaceHeader"
import WorkspaceNav from "./WorkspaceNav"
import {Outlet} from "react-router-dom"

const WorkspaceLayout = () => {



  return (

    <div>
        <WorkspaceHeader />
        <WorkspaceNav />

        <div>
            <Outlet />
        </div>
    </div>

  )
}

export default WorkspaceLayout