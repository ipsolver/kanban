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

  return {board, setBoard};
}