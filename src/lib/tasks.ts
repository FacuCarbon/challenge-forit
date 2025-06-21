import { FilterParams, Task, TaskDataForm } from "@/types/Task";
import { randomUUID } from "crypto";
import { readTasks, writeTasks } from "./utils/tasks-storage";

export class TaskService {
  getTasks({ completed, search }: FilterParams): Task[] {
    try {
      const tasks: Task[] = readTasks();
      return tasks?.filter((task) => {
        if (completed !== undefined && task?.completed !== completed) {
          return false;
        }

        if (
          search &&
          !task?.title?.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }

        return true;
      });
    } catch (error) {
      console.error("error in getTasks: ", error);
      throw error;
    }
  }

  ///

  createTask(task: TaskDataForm): Task {
    try {
      const tasks: Task[] = readTasks();
      const newTask: Task = {
        id: randomUUID(),
        ...task,
        createdAt: new Date(),
        updatedAt: null,
      };

      tasks.push(newTask);
      writeTasks(tasks);
      return newTask;
    } catch (error) {
      console.error("error in createTask: ", error);
      throw error;
    }
  }

  updateTask(taskId: string, task: TaskDataForm): Task {
    try {
      const tasks: Task[] = readTasks();
      const index = tasks.findIndex((t) => t?.id === taskId);
      if (index === -1) {
        throw new Error("Task not found");
      }
      const updatedTask: Task = {
        ...tasks[index],
        ...task,
        updatedAt: new Date(),
      };
      tasks[index] = updatedTask;
      writeTasks(tasks);

      return updatedTask;
    } catch (error) {
      console.error("error in updateTask: ", error);
      throw error;
    }
  }

  getTaskById(id: string): Task {
    try {
      const tasks: Task[] = readTasks();
      const task = tasks.find((t) => t?.id === id);
      if (!task) throw new Error("Task not found");
      return task;
    } catch (error) {
      console.error("error in getTaskById: ", error);
      throw error;
    }
  }

  deleteTask(id: string): void {
    try {
      const tasks: Task[] = readTasks();
      const index = tasks.findIndex((t) => t?.id === id);
      if (index === -1) throw new Error("Task not found");
      tasks.splice(index, 1);
      writeTasks(tasks);
    } catch (error) {
      console.error("error in deleteTask: ", error);
      throw error;
    }
  }
}
