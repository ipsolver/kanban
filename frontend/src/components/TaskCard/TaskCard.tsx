import styles from './TaskCard.module.css';

type Props = {
  title: string;
  description: string;
};

export const TaskCard = ({ title, description }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.actions}>
        <button>✏️</button>
        <button>🗑️</button>
      </div>
    </div>
  );
};
