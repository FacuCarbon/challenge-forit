import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(3, "Description is required"),
  completed: z.boolean(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
