import { TaskList } from "@/components/Task-list";
import { getTasks } from "@/lib/actions/tasks-actions";

export default async function Home() {
  const tasks = await getTasks({ completed: undefined });

  return (
    <div className="h-screen">
      <TaskList tasks={tasks} />
    </div>
  );
}
