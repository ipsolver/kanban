import styles from './Board.module.css';
import { Column } from '../Column/Column';
import type { Board as BoardType } from '../../types/board';
import type { Task } from '../../types/task';

type Props = {
  board: BoardType;
  tasks: Task[];
};

export const Board = ({ board, tasks }: Props) => {
  return (
    <div className={styles.board}>
      <div className={styles.boardTitle}>
        <h2>{board.name}</h2>
        <div className={styles.boardActions}>
          <button>✏️</button>
          <button>🗑️</button>
        </div>
      </div>

      <div className={styles.columns}>
        <Column
          title="ToDo"
          type="TODO"
          showAdd
          tasks={tasks}
        />

        <Column
          title="In progress"
          type="IN_PROGRESS"
          tasks={tasks}
        />

        <Column
          title="Done"
          type="DONE"
          tasks={tasks}
        />
      </div>
    </div>
  );
};
