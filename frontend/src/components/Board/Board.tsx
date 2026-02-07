import styles from './Board.module.css';
import { Column } from '../Column/Column';

export const Board = () => {
  return (
    <div className={styles.board}>
        <div className={styles.boardTitle}>
            <h2>Board_name1</h2>
            <div className={styles.boardActions}>
                <button>✏️</button>
                <button>🗑️</button>
            </div>
        </div>

    <div className={styles.columns}>
        <Column
            title="ToDo"
            showAdd
            tasks={[
                { id: '1', title: 'Task 1', description: 'Description...' },
                { id: '2', title: 'Task 2', description: 'Description...' },
            ]}
        />

        <Column
            title="In progress"
            tasks={[
            { id: '3', title: 'Task 3', description: 'Description...' },
            ]}
        />

        <Column
            title="Done"
            tasks={[
            { id: '4', title: 'Task 4', description: 'Description...' },
            ]}
        />
      </div>
    </div>
  );
};
