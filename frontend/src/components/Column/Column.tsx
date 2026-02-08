import styles from './Column.module.css';
import { TaskCard } from '../TaskCard/TaskCard';
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
  const columnTasks = [...tasks]
    .filter(task => task.type === type)
    .sort((a, b) => a.position - b.position);

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {showAdd && <button className={styles.addBtn}
        onClick={onAddTask}
        >+</button>}
      </div>

      <div className={styles.list}>
        {columnTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  );
};
