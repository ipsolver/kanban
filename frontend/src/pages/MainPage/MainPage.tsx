import styles from './MainPage.module.css';
import { useBoard } from '../../hooks/useBoard';
import { useTasks } from '../../hooks/useTasks';
import { Board } from '../../components/Board/Board';
import { useState } from 'react';
import { BoardModal } from '../../components/BoardModal/BoardModal';
import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal';
import { useBoardRoute } from '../../hooks/useBoardRoute';


export const MainPage = () => {
  const [inputId, setInputId] = useState('');
  const {boardId, setBoardId} = useBoardRoute();

  const { board, operations } = useBoard(boardId);
  const { tasks, operations: taskOps } = useTasks(boardId);

  const [isBoardModalOpen, setBoardModalOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);


  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <input
          placeholder="Write here ID of board"
          className={styles.input}
          value={inputId}
          onChange={e => setInputId(e.target.value)}
        />
        <button onClick={() => {
          const trimId = inputId.trim()
          setBoardId(trimId || null)}}>Load</button>
        <button onClick={() => setBoardModalOpen(true)}>New</button>
      </div>

      <BoardModal
        open={isBoardModalOpen}
        onClose={() => setBoardModalOpen(false)}
        onSubmit={(name) =>
          operations.createBoard(name).then(b => setBoardId(b.id))
        }
      />

      {board && (
        <>
          <Board
            board={board}
            tasks={tasks}
            taskOps={taskOps}
            onEditBoard={() => setEditingBoard(true)}
            onDeleteBoard={() => setConfirmDelete(true)}
          />

          <BoardModal
            open={editingBoard}
            initialName={board.name}
            onClose={() => setEditingBoard(false)}
            onSubmit={(name) =>
              operations.updateBoard(board.id, name)
            }
          />

          {confirmDelete && (
            <ConfirmModal
              text={`Delete board "${board.name}"?`}
              onConfirm={() => {
                operations.deleteBoard(board.id);
                setBoardId(null);
                setConfirmDelete(false);
              }}
              onClose={() => setConfirmDelete(false)}
            />
          )}
        </>
      )}

    </div>
  );
};
