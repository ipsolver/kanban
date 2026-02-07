import styles from './Column.module.css';
import { TaskCard } from '../TaskCard/TaskCard';
import type { Task } from '../../types/task';

type Props = {
  title: string;
  type: Task['type'];
  tasks: Task[];
  showAdd?: boolean;
};

export const Column = ({ title, type, tasks, showAdd }: Props) => {
  const columnTasks = tasks
    .filter(task => task.type === type)
    .sort((a, b) => a.position - b.position);

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {showAdd && <button className={styles.addBtn}>+</button>}
      </div>

      <div className={styles.list}>
        {columnTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </div>
    </div>
  );
};
