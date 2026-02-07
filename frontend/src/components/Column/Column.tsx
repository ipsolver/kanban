import styles from './Column.module.css';
import { TaskCard } from '../TaskCard/TaskCard';

type Task = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  title: string;
  tasks: Task[];
  showAdd?: boolean;
};

export const Column = ({title, tasks, showAdd}: Props) => {
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {showAdd && <button className={styles.addBtn}>+</button>}
      </div>

      <div className={styles.list}>
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
          />
        ))}
      </div>
    </div>
  );
};