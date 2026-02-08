import styles from './TaskCard.module.css';
import type { Task } from '../../types/task';

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onOpen: (task: Task) => void;
};

export const TaskCard = ({ task, onEdit, onDelete, onOpen}: Props) => {
  const shortDescription = task.description.length > 14 ? task.description.slice(0, 14) + '...' : task.description;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h4 className={styles.title} onClick={() => onOpen(task)}>{task.title}</h4>
        <p className={styles.description}>{shortDescription}</p>
      </div>

      <div className={styles.actions}>
        <button onClick={() => onEdit(task)}>✏️</button>
        <button onClick={() => onDelete(task)}>🗑️</button>
      </div>
    </div>
  );
};
