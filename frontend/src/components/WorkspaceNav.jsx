import { MdOutlineTask } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { AiOutlineTeam } from "react-icons/ai";
import { BsActivity } from "react-icons/bs";
import { useNavigate, NavLink } from "react-router-dom";

const WorkspaceNav = () => {

    const navigate = useNavigate()

    return (
            
        <div className="fixed bottom-0 z-30 flex  justify-evenly gap-x-6 border-t border-gray-300 px-4 bg-white pt-2 w-full text-xs">
            <NavLink
                to="" end
                    className={({ isActive }) =>
                    isActive
                        ? "border-b-2 border-gray-900 text-gray-900 pb-2"
                        : "text-gray-600 pb-2"
                }
            >
               <div className="flex flex-col items-center"> <MdOutlineTask/><div>Tasks</div></div>
            </NavLink>

            <NavLink
                to="documents"
                className={({ isActive }) =>
                    isActive
                        ? "border-b-2 border-gray-900 text-gray-900 pb-2"
                        : "text-gray-500 pb-2"
                }
            >
              <div className="flex flex-col items-center"><GrDocumentText/><div>Documents</div></div>
            </NavLink>

             <NavLink
                to="activity"
                className={({ isActive }) =>
                    isActive
                        ? "border-b-2 border-gray-900 text-gray-900 pb-2"
                        : "text-gray-500 pb-2"
                }
            >
                <div className="flex flex-col items-center"><BsActivity/><div>Activity</div></div>
            </NavLink>

            <NavLink
                to="team"
                className={({ isActive }) =>
                    isActive
                        ? "border-b-2 border-gray-900 text-gray-900 pb-2"
                        : "text-gray-500 pb-2"
                }
            >
              <div className="flex flex-col items-center"><AiOutlineTeam/><div>Team</div></div>
            </NavLink>
        </div>
    )
}

export default WorkspaceNav