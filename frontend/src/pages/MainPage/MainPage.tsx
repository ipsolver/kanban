import styles from './MainPage.module.css';
import { useBoard } from '../../hooks/useBoard';
import { useTasks } from '../../hooks/useTasks';
import { Board } from '../../components/Board/Board';
import { useState } from 'react';

export const MainPage = () => {
  const [inputId, setInputId] = useState('');
  const [boardId, setBoardId] = useState<string | null>(null);

  const { board } = useBoard(boardId);
  const { tasks } = useTasks(boardId);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <input
          placeholder="Write here ID of board"
          className={styles.input}
          value={inputId}
          onChange={e => setInputId(e.target.value)}
        />
        <button onClick={() => setBoardId(inputId)}>Load</button>
        <button>New</button>
      </div>

      {board && (
        <Board
          board={board}
          tasks={tasks}
        />
      )}
    </div>
  );
};
