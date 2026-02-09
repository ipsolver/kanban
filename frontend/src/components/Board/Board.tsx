import styles from './Board.module.css';
import { Column } from '../Column/Column';
import type { Board as BoardType } from '../../types/board';
import type { Task } from '../../types/task';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { TaskModal } from '../TaskModal/TaskModal';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { TaskOperations } from '../../types/TaskOperations';
import { TaskViewModal } from '../TaskViewModal/TaskViewModal';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ColumnType } from '../../types/column';
import { TaskCard } from '../TaskCard/TaskCard';


type Props = {
  board: BoardType;
  tasks: Task[];
  taskOps: TaskOperations
  onEditBoard: () => void;
  onDeleteBoard: () => void;
};

export const Board = ({ board, tasks, taskOps, onEditBoard, onDeleteBoard }: Props) => {
  const operations = taskOps;

  const [columns, setColumns] = useState<Record<keyof typeof ColumnType, string[]>>({
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const columnsRef = useRef(columns);

  useEffect(() => {
    columnsRef.current = columns;
  }, [columns]);

  const setColumnsWithRef = (
    updater: (prev: Record<keyof typeof ColumnType, string[]>) => Record<keyof typeof ColumnType, string[]>
  ) => {
    setColumns((prev) => {
      const next = updater(prev);
      columnsRef.current = next;
      return next;
    });
  };

  const tasksById = useMemo(() => {
    const map = new Map<string, Task>();
    for (const t of tasks) map.set(t.id, t);
    return map;
  }, [tasks]);

  useEffect(() => {
    const next: Record<keyof typeof ColumnType, string[]> = {
      TODO: [],
      IN_PROGRESS: [],
      DONE: [],
    };
    for (const col of Object.values(ColumnType)) {
      next[col] = [...tasks]
        .filter((t) => t.type === col)
        .sort((a, b) => a.position - b.position)
        .map((t) => t.id);
    }
    setColumns(next);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    })
  );

  const findContainer = (id: string): keyof typeof ColumnType | null => {
    if ((Object.values(ColumnType) as string[]).includes(id)) {
      return id as keyof typeof ColumnType;
    }
    const entries = Object.entries(columns) as [keyof typeof ColumnType, string[]][];
    for (const [col, ids] of entries) {
      if (ids.includes(id)) return col;
    }
    return null;
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    const activeContainer = findContainer(String(active.id));
    const overContainer = findContainer(String(over.id));
    if (!activeContainer || !overContainer) return;

    if (activeContainer !== overContainer) {
      setColumnsWithRef((prev) => {
        const activeIds = prev[activeContainer];
        const overIds = prev[overContainer];
        const activeIndex = activeIds.indexOf(String(active.id));

        const overIndex = (Object.values(ColumnType) as string[]).includes(String(over.id))
          ? overIds.length
          : overIds.indexOf(String(over.id));

        const nextActive = [...activeIds];
        nextActive.splice(activeIndex, 1);
        const nextOver = [...overIds];
        nextOver.splice(Math.max(0, overIndex), 0, String(active.id));

        return {
          ...prev,
          [activeContainer]: nextActive,
          [overContainer]: nextOver,
        };
      });
    }
  };

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    if (!over) return;

    const activeContainer = findContainer(String(active.id));
    const overContainer = findContainer(String(over.id));
    if (!activeContainer || !overContainer) return;

    const current = columnsRef.current;
    let nextSnapshot = current;
    if (activeContainer === overContainer) {
      const ids = current[activeContainer];
      const oldIndex = ids.indexOf(String(active.id));
      const newIndex = (Object.values(ColumnType) as string[]).includes(String(over.id))
        ? ids.length - 1
        : ids.indexOf(String(over.id));
      if (oldIndex !== newIndex && oldIndex !== -1 && newIndex !== -1) {
        nextSnapshot = { ...current, [activeContainer]: arrayMove(ids, oldIndex, newIndex) };
        columnsRef.current = nextSnapshot;
        setColumns(nextSnapshot);
      }
    }

    const patches: { id: string; position: number; type: keyof typeof ColumnType }[] = [];
    (Object.values(ColumnType) as (keyof typeof ColumnType)[]).forEach((col) => {
      nextSnapshot[col].forEach((id, index) => {
        const t = tasksById.get(id);
        if (!t) return;
        if (t.type !== col || t.position !== index) {
          patches.push({ id, type: col, position: index });
        }
      });
    });

    if (patches.length) {
      await operations.reorder(patches);
    }
  };

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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={(e) => setActiveId(String(e.active.id))}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <DragOverlay>
          {activeId ? (() => {
            const t = tasksById.get(activeId);
            return t ? <TaskCard task={t} onEdit={() => {}} onDelete={() => {}} onOpen={() => {}} /> : null;
          })() : null}
        </DragOverlay>
      <div className={styles.columns}>
        <Column
          title="ToDo"
          type="TODO"
          showAdd
          tasks={columns.TODO.map((id) => tasksById.get(id)).filter(Boolean) as Task[]}
          onAddTask={() => setCreateOpen(true)}
          onEditTask={setEditingTask}
          onDeleteTask={setDeletingTask}
          onOpen={setViewTask}
        />

        <Column
          title="In progress"
          type="IN_PROGRESS"
          tasks={columns.IN_PROGRESS.map((id) => tasksById.get(id)).filter(Boolean) as Task[]}
          onEditTask={setEditingTask}
          onDeleteTask={setDeletingTask}
          onOpen={setViewTask}
        />

        <Column
          title="Done"
          type="DONE"
          tasks={columns.DONE.map((id) => tasksById.get(id)).filter(Boolean) as Task[]}
          onEditTask={setEditingTask}
          onDeleteTask={setDeletingTask}
          onOpen={setViewTask}
        />
      </div>
      </DndContext>

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
