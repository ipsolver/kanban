import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Board } from '../../types/board';
import { boardsApi } from '../../api/boards.api';

type BoardState = {
  board: Board | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: BoardState = {
  board: null,
  status: 'idle',
  error: null,
};

export const fetchBoardById = createAsyncThunk<Board, string>(
  'board/fetchById',
  async (boardId: string) => {
    const res = await boardsApi.getById(boardId);
    return res.data;
  }
);

export const createBoard = createAsyncThunk<Board, { name: string }>(
  'board/create',
  async ({ name }) => {
    const res = await boardsApi.create({ name });
    return res.data;
  }
);

export const updateBoard = createAsyncThunk<Board, { id: string; name: string }>(
  'board/update',
  async ({ id, name }) => {
    const res = await boardsApi.update(id, { name });
    return res.data;
  }
);

export const deleteBoard = createAsyncThunk<string, { id: string }>(
  'board/delete',
  async ({ id }) => {
    await boardsApi.delete(id);
    return id;
  }
);

const slice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    clearBoard(state) {
      state.board = null;
      state.status = 'idle';
      state.error = null;
    },
    setBoard(state, action: PayloadAction<Board | null>) {
      state.board = action.payload;
      state.status = action.payload ? 'succeeded' : 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.board = action.payload;
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load board';
      })

      .addCase(createBoard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.board = action.payload;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.board = action.payload;
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.board = null;
        state.status = 'idle';
        state.error = null;
      });
  },
});

export const boardActions = slice.actions;
export const boardReducer = slice.reducer;
