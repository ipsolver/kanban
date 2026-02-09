import { api } from "./axios";
import type { Board } from '../types/board';

export const boardsApi = {
    create(data: {name: string}) {
        return api.post<Board>('/boards', data);
    },

    getById(id: string) {
        return api.get<Board>(`/boards/${id}`);
    },

    update(id: String, data: {name: string}) {
        return api.patch<Board>(`/boards/${id}`, data);
    },

    delete(id: string) {
        return api.delete(`/boards/${id}`);
    },

}