import styles from './TaskCard.module.css';
import type { Task } from '../../types/task';

type Props = {
  task: Task;
};

export const TaskCard = ({ task }: Props) => {
  const shortDescription = task.description.length > 20 ? task.description.slice(0, 20) + '...' : task.description;

  const openTaskModal = () => {
    console.log('Open task:', task.id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h4 
        className={styles.title}
        onClick={openTaskModal}
        >{task.title}</h4>
        <p className={styles.description}>{shortDescription}</p>
      </div>

      <div className={styles.actions}>
        <button>✏️</button>
        <button>🗑️</button>
      </div>
    </div>
  );
};
