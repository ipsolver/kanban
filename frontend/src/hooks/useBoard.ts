import { useEffect, useState } from 'react';
import type { Board } from '../types/board';
import { boardsApi } from '../api/boards.api';

export function useBoard(boardId: string | null) {
    const [board, setBoard] = useState<Board | null>(null);
    useEffect(() => {
        if (!boardId) 
            return;

        boardsApi.getById(boardId)
        .then(res => setBoard(res.data));
    }, [boardId]);

    const operations = {
        async createBoard(name: string) {
            const res = await boardsApi.create({name});
            setBoard(res.data);
            return res.data;
        },

        async updateBoard(id: string, name: string) {
            const res = await boardsApi.update(id, {name});
            setBoard(res.data);
            return res.data;
        },

        async deleteBoard(id: string) {
            await boardsApi.delete(id);
            setBoard(null);
        },
    };

  return {board, operations};
}