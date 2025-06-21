"use server";

import { TaskService } from "@/lib/tasks";
import { FilterParams, TaskDataForm } from "@/types/Task";
import { revalidatePath } from "next/cache";

const taskService = new TaskService();

export async function getTasks(params: FilterParams) {
  try {
    return taskService.getTasks(params);
  } catch (error) {
    console.error("error in getTasks action: ", error);
    throw new Error("Error getting tasks.");
  }
}

export async function getTaskById(id: string) {
  try {
    if (!id) throw new Error("Missing task id.");
    return taskService.getTaskById(id);
  } catch (error) {
    console.error("error in getTaskById action: ", error);
    throw new Error("Error getting task.");
  }
}
export async function createTask(data: TaskDataForm) {
  try {
    const task = taskService.createTask(data);
    if (!task) throw new Error("Error creating task.");
    revalidatePath("/");
    return task;
  } catch (error) {
    console.error("error in createTask action: ", error);
    throw new Error("Error creating task.");
  }
}

export async function updateTask(taskId: string, data: TaskDataForm) {
  try {
    const task = taskService.updateTask(taskId, data);
    if (!task) throw new Error("Task not found.");
    revalidatePath("/");
    return task;
  } catch (error) {
    console.error("error in updateTask action: ", error);
    throw new Error("Error in updating task.");
  }
}

export async function deleteTask(id: string) {
  try {
    if (!id) throw new Error("Missing task id.");
    revalidatePath("/");
    return taskService.deleteTask(id);
  } catch (error) {
    console.error("error in deleteTask action: ", error);
    throw new Error("Error deleting task.");
  }
}
