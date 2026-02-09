import { describe, it, expect } from '@jest/globals';
import { tasksReducer, tasksActions } from './tasksSlice';
import type { TasksState, ReorderPatch } from './tasksSlice';

describe('tasks reorder', () => {
  it('should apply optimistic reorder', () => {
    const prevState: TasksState = {
      tasks: [
        {
          id: '1',
          position: 1,
          type: 'TODO',
          title: '',
          description: '',
          boardId: '',
        },
        {
          id: '2',
          position: 2,
          type: 'IN_PROGRESS',
          title: '',
          description: '',
          boardId: '',
        },
      ],
      status: 'idle',
      error: null,
    };

    const patches: ReorderPatch[] = [
      { id: '2', position: 1, type: 'TODO' },
      { id: '1', position: 2, type: 'IN_PROGRESS' },
    ];

    const state = tasksReducer(
      prevState,
      tasksActions.applyReorderOptimistic(patches)
    );

    const task1 = state.tasks.find(t => t.id === '1')!;
    const task2 = state.tasks.find(t => t.id === '2')!;

    expect(task2.position).toBe(1);
    expect(task2.type).toBe('TODO');

    expect(task1.position).toBe(2);
    expect(task1.type).toBe('IN_PROGRESS');
  });
});
