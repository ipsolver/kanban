import { configureStore } from '@reduxjs/toolkit';
import { boardReducer } from '../features/boards/boardSlice';
import { tasksReducer } from '../features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
