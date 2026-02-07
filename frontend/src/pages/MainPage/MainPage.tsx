import styles from './MainPage.module.css';
import { Board } from '../../components/Board/Board';

export const MainPage = () => {
    return (
    <div className={styles.page}>
        <div className={styles.topBar}>
            <input
                placeholder="Write here ID of board"
                className={styles.input}
            />
        <button>Load</button>
        <button>New</button>
      </div>

      <Board />
    </div>
  );
};
