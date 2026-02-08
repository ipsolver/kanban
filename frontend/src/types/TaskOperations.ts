import type { Task } from "./task";

export type TaskOperations = {
    createTask: (data: Pick<Task, 'title' | 'description' | 'boardId'>) => Promise<Task>;
    updateTask: (id: string, data: Partial<Task>) => Promise<Task>;
    deleteTask: (id: string) => Promise<void>;
};