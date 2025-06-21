import { Modal } from "./Modal";
import { useForm } from "react-hook-form";

import { TaskFormData, taskSchema } from "@/lib/schemas/task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { twMergeCustom } from "@/lib/utils/tw-merge-custom";
import {
  createTask,
  getTaskById,
  updateTask,
} from "@/lib/actions/tasks-actions";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
type Props = {
  open: boolean;
  onClose: () => void;
  typeAction: "create" | "update";
  title?: string;
  taskId: string | null;
};

export const TaskForm = ({
  open,
  onClose,
  typeAction,
  title,

  taskId,
}: Props) => {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      completed: false,
    },
  });
  const watchCompleted = watch("completed");

  const baseClassInput =
    "p-2 bg-slate-300 border border-gray-300 rounded-md outline-0 w-full";

  const handleTaskForm = (data: TaskFormData) => {
    startTransition(() => {
      (async () => {
        try {
          if (typeAction === "create") {
            await createTask(data);
            toast.success("Task created successfully.");
          } else if (taskId) {
            await updateTask(taskId, data);
            toast.success("Task updated successfully.");
          }

          reset();
          //onClose();
        } catch (error) {
          toast.error(`Error in ${typeAction} task.`);
          console.error("❌ Error en handleTaskForm:", error);
        }
      })();
    });
  };

  const fetchTask = async (taskId: string) => {
    const task = await getTaskById(taskId);
    return task;
  };

  useEffect(() => {
    if (!taskId || typeAction !== "update") return;

    const loadTask = async () => {
      const task = await fetchTask(taskId);

      if (task) {
        reset({
          title: task?.title,
          description: task?.description,
          completed: task?.completed,
        });
      }
    };

    loadTask();
  }, [taskId, typeAction, reset]);

  return (
    <div>
      <Modal isOpen={open} onClose={onClose} title={title}>
        <form onSubmit={handleSubmit(handleTaskForm)}>
          <div className="">
            {errors.title && (
              <p className="text-red-600">* {errors.title.message}</p>
            )}
            <input
              {...register("title")}
              placeholder="Title"
              className={twMergeCustom(
                baseClassInput,
                errors?.title && "border-red-600"
              )}
            />
          </div>

          <div className="mt-4">
            <input
              {...register("description")}
              placeholder="Description"
              className={twMergeCustom(
                baseClassInput,
                errors?.description && "border-red-600"
              )}
            />
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              type="button"
              className={twMergeCustom(
                "transition-all duration-150 bg-gray-200 p-2 rounded-md",
                watchCompleted === false && "bg-[#E4C087] text-white"
              )}
              onClick={() => setValue("completed", false)}
            >
              Pending
            </button>
            <button
              type="button"
              className={twMergeCustom(
                "transition-all duration-150  bg-gray-200 p-2 rounded-md",
                watchCompleted === true && "bg-[#A0C878] text-white"
              )}
              onClick={() => setValue("completed", true)}
            >
              Completed
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              aria-label="Submit form"
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition w-[40%]"
            >
              {pending ? "Loading..." : `${typeAction} task`}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
