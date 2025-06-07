import { useEffect, useState } from "react";
import type { Task } from "../constant";
import { deleteTask, getUserTasks } from "../api/task";
import TaskTable from "../components/Task/TaskTable";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getUserTasks(page, limit);
      setTasks(tasks.tasks);
      if (tasks.page !== page) setPage(tasks.page);
      if (tasks.totalPages !== totalPages) setTotalPages(tasks.totalPages);
    };
    fetchTasks();
  }, [page]);

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

export default Tasks;
