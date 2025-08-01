export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

export type TaskDataForm = Omit<Task, "id" | "updatedAt" | "createdAt">;

export type FilterParams = {
  completed: boolean | undefined;
  search?: string;
};
