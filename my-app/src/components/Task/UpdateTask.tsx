import React, { useEffect, useRef, useState } from "react";
import { updateTask } from "../../api/task";
import type { Task } from "../../constant";

interface UpdateTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onUpdate: (task:Task) => void;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({
  isOpen,
  onClose,
  task,
  onUpdate,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutSide(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        console.log("Clicked outside popup");
        onClose();
      } else {
        console.log("Clicked inside popup");
      }
    }
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutSide);
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.id) return;
    const data = {
      title,
      description,
    };
    const res = await updateTask(data, task.id);
    if (res) {
      alert("Task Updated successfully!");
      onUpdate({ ...task, title, description });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-white p-6 rounded-xl shadow-lg min-w-[600px] min-h-[400px]"
      >
        <div
          onClick={() => onClose()}
          className=" cursor-pointer flex justify-end font-bold text-[18px]"
        >
          X
        </div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Update Task
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
            <form
              action="#"
              method="POST"
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="desc"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <input
                    id="desc"
                    name="desc"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
