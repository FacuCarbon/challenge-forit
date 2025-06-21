"use client";
import { formatDate } from "@/lib/utils/format-date";
import { twMergeCustom } from "@/lib/utils/tw-merge-custom";
import { Task } from "@/types/Task";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { TaskForm } from "./Task-form";
import { deleteTask } from "@/lib/actions/tasks-actions";
import { toast } from "sonner";
type Props = {
  task: Task;
};
export const TaskItem = ({ task }: Props) => {
  const [openEditTask, setOpenEditTask] = useState<boolean>(false);

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task?.id);
      toast.success("Task deleted successfully.");
    } catch (error) {
      console.log("error in handleDeleteTask: ", error);
      toast.error("Error deleting task.");
    }
  };

  return (
    <div className="bg-[#4E6688] rounded-md p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <p
          className={twMergeCustom(
            "min-w-[6rem] text-center text-sm font-semibold p-1 rounded-md",
            task?.completed ? "bg-[#A0C878]" : "bg-[#E4C087]"
          )}
        >
          {task?.completed ? "Done" : "In progress"}
        </p>
        <div className="flex items-center gap-3">
          <button aria-label="Edit task" onClick={() => setOpenEditTask(true)}>
            <CiEdit className="text-2xl" />
          </button>
          <button aria-label="Delete task" onClick={handleDeleteTask}>
            <GoTrash className="text-xl" />
          </button>
        </div>
      </div>
      <h3 className="text-center font-semibold">{task?.title}</h3>
      <p className="">{task?.description}</p>

      <div className="flex justify-between items-center mt-3">
        <div className="">
          <p className="text-sm ">Created</p>
          <span className="text-sm">{formatDate(task?.createdAt)}</span>
        </div>
        {task?.updatedAt && (
          <div className="">
            <p className="text-sm text-end">Last update</p>
            <span className="text-sm">{formatDate(task?.updatedAt)}</span>
          </div>
        )}
      </div>

      {openEditTask && (
        <TaskForm
          open={openEditTask}
          onClose={() => setOpenEditTask(false)}
          typeAction="update"
          title="Edit task"
          taskId={task?.id}
        />
      )}
    </div>
  );
};
