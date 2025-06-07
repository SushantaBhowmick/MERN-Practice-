import React, { useState } from "react";
import type { Task } from "../../constant";
import UpdateTask from "./UpdateTask";
import { getPaginationRange } from "../../utils/helper";

interface TaskTableProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  onDelete: (id: number) => void;
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  onTaskUpdate,
  onDelete,
  page,
  onPageChange,
  totalPages,
}) => {
  const [updateTaskItem, setUpdateTaskItem] = useState<Task | null>(null);
  const paginationRange = getPaginationRange(page, totalPages);

  const handleUpdatePopup = (item: Task) => {
    setUpdateTaskItem(item);
  };
  const handleCloseUpdateTask = () => {
    setUpdateTaskItem(null);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className=" min-w-full divide-y divide-gray-200 border rounded-lg shadow">
          <thead className=" bg-gray-100 text-gray-700 text-sm uppercase text-left">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">DueDate</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y  divide-gray-200 text-sm">
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="  text-center px-4 py-4 text-gray-500"
                >
                  No tasks available
                </td>
              </tr>
            ) : (
              tasks.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 font-medium">{item.title}</td>
                  <td className="px-4 py-2 font-medium">{item.description}</td>
                  <td className="px-4 py-2" autoCapitalize="">
                    {item.status}
                  </td>
                  <td className="px-4 py-2">
                    {item.dueDate
                      ? new Date(item.dueDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-2 ">{"user"}</td>
                  <td className="px-4 py-2 ">
                    <div className="flex items-center gap-4">
                      <button
                        className=" px-4 py-2 bg-green-500 text-white rounded-md font-semibold"
                        onClick={() => handleUpdatePopup(item)}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => onDelete(item.id!)}
                        className=" px-4 py-2 bg-red-500 text-white rounded-md font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* pagination */}
        {tasks.length > 0 && (
          // Old one
          //  <div className="flex justify-center gap-6 items-center mt-10">
          //   <button
          //     onClick={()=>onPageChange(page - 1)}
          //     disabled={page === 1}
          //     className="bg-gray-300 px-4 py-1 rounded disabled:opacity-50"
          //   >
          //     Prev
          //   </button>
          //   <span>
          //     Page {page} of {totalPages}
          //   </span>
          //   <button
          //     onClick={()=>onPageChange(page + 1)}
          //     disabled={page === totalPages}
          //     className="bg-gray-300 px-4 py-1 rounded disabled:opacity-50"
          //   >
          //     Next
          //   </button>
          // </div>

          // Updated one
          <div className="flex gap-1 mt-4 justify-center items-center">
            {page !== 1 && (
              <button
                onClick={() => onPageChange(page - 1)}
                className="ml-2 px-4 py-2 text-black bg-gray-400 font-semibold rounded"
              >
               &lt; Prev
              </button>
            )}
            {paginationRange.map((pg, idx) =>
              pg === "..." ? (
                <span
                  key={idx}
                  className="px-3 py-2 bg-gray-700 text-white rounded"
                >
                  ...
                </span>
              ) : (
                <button
                  key={idx}
                  onClick={() => onPageChange(pg as number)}
                  className={`px-3 py-2 rounded font-semibold ${
                    pg === page
                      ? "bg-gray-800 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {pg}
                </button>
              )
            )}

            {page < totalPages && (
              <button
                onClick={() => onPageChange(page + 1)}
                className="ml-2 px-4 py-2 font-semibold bg-red-600 text-white rounded"
              >
                Next &gt;
              </button>
            )}
          </div>
        )}

        {/* update task popup  */}
        {updateTaskItem && (
          <UpdateTask
            isOpen={true}
            onClose={handleCloseUpdateTask}
            task={updateTaskItem}
            onUpdate={onTaskUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default TaskTable;
