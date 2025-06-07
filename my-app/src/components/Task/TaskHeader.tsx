import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const TaskHeader = () => {
  const { user } = useUser();
  return (
    <div className="bg-slate-500 text-white font-bold">
      <div className=" flex items-center justify-center p-4 gap-16">
        <Link to={"/tasks"}>Your Tasks</Link>
        {user && user.role === "admin" && (
          <Link to={"admin-tasks"}>All Tasks</Link>
        )}
        <Link to={"create-task"}>Create Task</Link>
      </div>
    </div>
  );
};

export default TaskHeader;
