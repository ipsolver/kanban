import { useState, useEffect } from "react";
import { tasksApi } from "../api/tasks.api";
import type { Task } from "../types/task";

export function useTask(taskId: string | null) {
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!taskId) 
        return;
    tasksApi.getById(taskId).then(res => setTask(res.data));
  }, [taskId]);

  return { task };
}
