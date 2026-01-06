import { MdOutlineTask } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { AiOutlineTeam } from "react-icons/ai";
import { BsActivity } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const WorkspaceNav = () => {

    const navigate=useNavigate()

    return (

        <div className='flex px-5 py-2 justify-evenly border-b border-gray-300 text-xs font-semibold'>

            <div className="flex items-center gap-x-1"
            onClick={()=>navigate("task")}
            >
                <MdOutlineTask />
                <h1>Tasks</h1>
            </div>
            <div className="flex items-center gap-x-1"
             onClick={()=>navigate("documents")}
            >
                < GrDocumentText />
                <h1>Documents</h1>
            </div>

            <div className="flex items-center gap-x-1"
             onClick={()=>navigate("activity")}
            >
                <BsActivity />
                <h1>Activity</h1>
            </div>

            <div className="flex items-center gap-x-1"
             onClick={()=>navigate("team")}
            >
                <AiOutlineTeam />
                <h1>Team</h1>
            </div>

        </div>
    )
}

export default WorkspaceNav