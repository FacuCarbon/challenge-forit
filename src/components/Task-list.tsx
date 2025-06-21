"use client";
import { Task } from "@/types/Task";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { getTasks } from "@/lib/actions/tasks-actions";
import { TaskForm } from "./Task-form";
import { TaskItem } from "./Task-item";
import { SearchBar } from "./Search-bar";
import { FilterTasks } from "./Filter-tasks";

type Props = {
  tasks: Task[];
};
export const TaskList = ({ tasks }: Props) => {
  const [currentTasks, setCurrentTasks] = useState<Task[]>(tasks);
  const [openCreateTask, setOpenCreateTask] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [completed, setCompleted] = useState<boolean | undefined>(undefined);

  const retrieveTasks = async () => {
    const tasks = await getTasks({ completed, search });
    setCurrentTasks(tasks);
  };

  useEffect(() => {
    retrieveTasks();
  }, [search, completed, tasks]);
  return (
    <div className="p-3 relative h-full">
      <div className="flex justify-center">
        <SearchBar
          query={search?.toLowerCase()}
          onChange={(query) => {
            setSearch(query);
          }}
        />
      </div>
      <div className="flex justify-center mt-3">
        <FilterTasks
          completed={completed}
          changeCompleted={(status) => setCompleted(status)}
        />
      </div>
      {currentTasks.length > 0 ? (
        <div className="p-1 overflow-y-auto max-h-[80%] mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:max-h-[80%] 2xl:grid-cols-4">
          {currentTasks.map((task) => (
            <TaskItem key={task?.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-1/2">
          <p className="">
            No tasks found {search?.length > 0 ? "for that search" : ""}
          </p>
        </div>
      )}

      {openCreateTask && (
        <TaskForm
          open={openCreateTask}
          onClose={() => setOpenCreateTask(false)}
          typeAction="create"
          title="Create new task"
          taskId={null}
        />
      )}

      <div className="absolute bottom-[30px] right-[30px]">
        <button
          className="rounded-full bg-[#979494] p-4 shadow-sm "
          onClick={() => setOpenCreateTask(true)}
        >
          <GoPlus className="text-3xl text-[#332d56]" />
        </button>
      </div>
    </div>
  );
};
