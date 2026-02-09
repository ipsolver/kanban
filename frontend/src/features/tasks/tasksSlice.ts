import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../../types/task';
import type { ColumnType } from '../../types/column';
import { tasksApi } from '../../api/tasks.api';

export type TasksState = {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
  error: null,
};

export const fetchTasksByBoard = createAsyncThunk<Task[], string>(
  'tasks/fetchByBoard',
  async (boardId) => {
    const res = await tasksApi.getByBoard(boardId);
    return res.data;
  }
);

export const createTask = createAsyncThunk<
  Task,
  Pick<Task, 'title' | 'description' | 'boardId'>
>('tasks/create', async (data) => {
  const res = await tasksApi.create(data);
  return res.data;
});

export const updateTask = createAsyncThunk<
  Task,
  { id: string; data: Partial<Task> }
>('tasks/update', async ({ id, data }) => {
  const res = await tasksApi.update(id, data);
  return res.data;
});

export const deleteTask = createAsyncThunk<string, { id: string }>(
  'tasks/delete',
  async ({ id }) => {
    await tasksApi.delete(id);
    return id;
  }
);

export type ReorderPatch = {
  id: string;
  position: number;
  type: ColumnType;
};

export const reorderTasks = createAsyncThunk<
  void,
  { patches: ReorderPatch[] }
>('tasks/reorder', async ({ patches }) => {
  await tasksApi.reorder(patches);
});

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTasks(state) {
      state.tasks = [];
      state.status = 'idle';
      state.error = null;
    },
    applyReorderOptimistic(state, action: PayloadAction<ReorderPatch[]>) {
      const patches = action.payload;
      const byId = new Map(patches.map((p) => [p.id, p]));
      state.tasks = state.tasks.map((t) => {
        const p = byId.get(t.id);
        return p ? { ...t, type: p.type, position: p.position } : t;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksByBoard.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTasksByBoard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasksByBoard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load tasks';
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks = [action.payload, ...state.tasks];
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((t) => (t.id === action.payload.id ? action.payload : t));
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      })
      .addCase(reorderTasks.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to reorder tasks';
      });
  },
});

export const tasksActions = slice.actions;
export const tasksReducer = slice.reducer;
