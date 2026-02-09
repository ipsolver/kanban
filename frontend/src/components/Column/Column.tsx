import styles from './Column.module.css';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { SortableTaskCard } from '../TaskCard/SortableTaskCard';
import type { Task } from '../../types/task';

type Props = {
  title: string;
  type: Task['type'];
  tasks: Task[];
  showAdd?: boolean;
  onAddTask?: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onOpen: (task: Task) => void;
};

export const Column = ({ title, type, tasks, showAdd, onAddTask, onEditTask, onDeleteTask, onOpen }: Props) => {
  const columnTasks = tasks;

  const { setNodeRef, isOver } = useDroppable({ id: type });

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {showAdd && <button className={styles.addBtn}
        onClick={onAddTask}
        >+</button>}
      </div>

      <div className={styles.list} ref={setNodeRef} data-over={isOver ? '1' : '0'}>
        <SortableContext items={columnTasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        {columnTasks.map(task => (
          <SortableTaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onOpen={onOpen}
          />
        ))}
        </SortableContext>
      </div>
    </div>
  );
};
