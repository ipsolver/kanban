import { api } from './axios';
import type { Task } from '../types/task';
import { ColumnType } from '../types/column';

export const tasksApi = {
  getByBoard(boardId: string) {
    return api.get<Task[]>('/tasks', {
      params: {boardId}
    });
  },

  getByType(type: ColumnType) {
    return api.get<Task[]>(`/tasks/column/${type}`);
  },

  create(data: {
    title: string;
    description: string;
    boardId: string;
  }) {
    return api.post<Task>('/tasks', data);
  },

  update(id: string, data: Partial<Task>) {
    return api.patch<Task>(`/tasks/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/tasks/${id}`);
  },

  reorder(tasks: {
    id: string;
    position: number;
    type: ColumnType;
  }[]) {
    return api.patch('/tasks/reorder', { tasks });
  },
};
