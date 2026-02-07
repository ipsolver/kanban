import { useEffect, useState } from 'react';
import { tasksApi } from '../api/tasks.api';
import type { Task } from '../types/task';

export function useTasks(boardId: string | null) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!boardId) 
        return;

    tasksApi.getByBoard(boardId)
      .then(res => setTasks(res.data));
  }, [boardId]);

  return {
    tasks,
    setTasks,
  };
}
