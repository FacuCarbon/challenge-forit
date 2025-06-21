import fs from "fs";
import path from "path";
import { Task } from "@/types/Task";

const tasksPath = path.join(process.cwd(), "src", "lib", "data", "tasks.json");

export function readTasks(): Task[] {
  if (!fs.existsSync(tasksPath)) return [];
  const data = fs.readFileSync(tasksPath, "utf-8");
  try {
    return JSON.parse(data) as Task[];
  } catch (error) {
    console.error("Error in tasks.json:", error);
    return [];
  }
}

export function writeTasks(tasks: Task[]) {
  try {
    fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error("Error in tasks.json:", error);
  }
}
