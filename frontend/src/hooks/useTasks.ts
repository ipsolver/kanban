import { useEffect, useState } from 'react';
import { tasksApi } from '../api/tasks.api';
import type { Task } from '../types/task';
import type { TaskOperations } from '../types/TaskOperations';

export function useTasks(boardId: string | null): {tasks: Task[], operations: TaskOperations} {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!boardId) 
        return;

    tasksApi.getByBoard(boardId)
      .then(res => setTasks(res.data));
  }, [boardId]);

  const operations = {
    async createTask(data: Pick<Task, 'title' | 'description' | 'boardId'>) {
      const res = await tasksApi.create(data);
      setTasks(prev => [res.data, ...prev]);
      return res.data;
    },

    async updateTask(id: string, data: Partial<Task>) {
      const res = await tasksApi.update(id, data);
      setTasks(prev =>
        prev.map(t => (t.id === id ? res.data : t)));
        return res.data;
    },

    async deleteTask(id: string) {
      await tasksApi.delete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    },
  };

  return {
    tasks,
    operations,
  };
}
