import { boardReducer, boardActions } from './boardSlice';
import type { BoardState } from './boardSlice';
import '../../../jest.config';
import { describe, it, expect } from '@jest/globals';

describe('board reducer', () => {
  it('should clear board', () => {
    const prevState: BoardState = {
      board: { id: '123', name: 'Test board' },
      status: 'idle',
      error: null,
    };

    const state = boardReducer(prevState, boardActions.clearBoard());

    expect(state.board).toBeNull();
    expect(state.status).toBe('idle');
  });
});
