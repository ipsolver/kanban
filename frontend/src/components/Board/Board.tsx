import styles from './Board.module.css';
import { Column } from '../Column/Column';
import type { Board as BoardType } from '../../types/board';
import type { Task } from '../../types/task';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { TaskModal } from '../TaskModal/TaskModal';
import { useState } from 'react';
import type { TaskOperations } from '../../types/TaskOperations';
import { TaskViewModal } from '../TaskViewModal/TaskViewModal';

type Props = {
  board: BoardType;
  tasks: Task[];
  taskOps: TaskOperations
  onEditBoard: () => void;
  onDeleteBoard: () => void;
};

export const Board = ({ board, tasks, taskOps, onEditBoard, onDeleteBoard }: Props) => {
  const operations = taskOps;

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [viewTask, setViewTask] = useState<Task | null>(null);


  return (
    <div className={styles.board}>
      <div className={styles.boardTitle}>
        <h2>{board.name}</h2>
        <div className={styles.boardActions}>
          <button onClick={onEditBoard}>✏️</button>
          <button onClick={onDeleteBoard}>🗑️</button>
        </div>
      </div>

      <div className={styles.columns}>
        <Column
          title="ToDo"
          type="TODO"
          showAdd
          tasks={tasks}
          onAddTask={() => setCreateOpen(true)}
          onEditTask={setEditingTask}
          onDeleteTask={setDeletingTask}
          onOpen={setViewTask}
        />

        <Column
          title="In progress"
          type="IN_PROGRESS"
          tasks={tasks}
          onEditTask={setEditingTask}
          onDeleteTask={setDeletingTask}
          onOpen={setViewTask}
        />

        <Column
          title="Done"
          type="DONE"
          tasks={tasks}
          onEditTask={setEditingTask}
          onDeleteTask={setDeletingTask}
          onOpen={setViewTask}
        />
      </div>

        {/* Create */}
      <TaskModal
        open={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={(data) =>
          operations.createTask({
            ...data,
            boardId: board.id,
          })
        }
      />

      {/* Edit */}
      <TaskModal
        open={!!editingTask}
        initialTask={editingTask ?? undefined}
        onClose={() => setEditingTask(null)}
        onSubmit={(data) =>
          editingTask &&
          operations.updateTask(editingTask.id, data)
        }
      />

      {/* Delete */}
      {deletingTask && (
        <ConfirmModal
          text={`Delete task "${deletingTask.title}"?`}
          onConfirm={() => {
            operations.deleteTask(deletingTask.id);
            setDeletingTask(null);
          }}
          onClose={() => setDeletingTask(null)}
        />
      )}
      
      {/* Read */}
      {viewTask && <TaskViewModal 
          task = {viewTask}
          onClose={() => setViewTask(null)}
      />}
    </div>
  );
};
