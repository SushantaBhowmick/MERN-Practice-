import { useEffect, useState } from "react";
import TaskTable from "./TaskTable";
import type { Task } from "../../constant";
import { deleteTask, getAllTask } from "../../api/task";

const AdminTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const fetchTasks = async (page: number) => {
      const tasks = await getAllTask(page, limit,debouncedSearch);
      setTasks(tasks.tasks);
      if (tasks.page !== page) setPage(tasks.page);
      if (tasks.totalPages !== totalPages) setTotalPages(tasks.totalPages);
    };
    fetchTasks(page);
  }, [page, limit,debouncedSearch]);

  useEffect(()=>{
    const handler = setTimeout(()=>{
      setDebouncedSearch(search)
    },500);
    return()=>{
      clearTimeout(handler)
    }
  },[search])

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDelte = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    const res = await deleteTask(id);
    if (res) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* filter section */}
      <div className="flex justify-between items-center mb-5">
        <div className="">
          <select
            name=""
            id=""
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border p-2 rounded-md"
          >
            {[5, 10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                Show {n}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <form action="">
            <div className="flex">
              <input
                type="text"
                className="border p-2 rounded-bl-md rounded-tl-md"
                placeholder="Search here"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
              <button className="border p-2 rounded-tr-md rounded-br-md">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className=""></div>
      </div>

      <TaskTable
        tasks={tasks}
        onTaskUpdate={handleTaskUpdate}
        onDelete={handleTaskDelte}
        page={page}
        onPageChange={setPage}
        totalPages={totalPages}
      />
    </div>
  );
};
export default AdminTask;
