import styles from './MainPage.module.css';
import { Board } from '../../components/Board/Board';
import { useEffect, useState } from 'react';
import { BoardModal } from '../../components/BoardModal/BoardModal';
import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal';
import { useBoardRoute } from '../../hooks/useBoardRoute';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { boardActions, createBoard, deleteBoard, fetchBoardById, updateBoard, } from '../../features/boards/boardSlice';
import {
  createTask, deleteTask, fetchTasksByBoard, reorderTasks, tasksActions, updateTask,
} from '../../features/tasks/tasksSlice';


export const MainPage = () => {
  const [inputId, setInputId] = useState('');
  const {boardId, setBoardId} = useBoardRoute();

  const dispatch = useAppDispatch();
  const board = useAppSelector((s) => s.board.board);
  const tasks = useAppSelector((s) => s.tasks.tasks);

  const [isBoardModalOpen, setBoardModalOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (!boardId) {
      dispatch(boardActions.clearBoard());
      dispatch(tasksActions.clearTasks());
      return;
    }

    dispatch(fetchBoardById(boardId));
    dispatch(fetchTasksByBoard(boardId));
  }, [boardId, dispatch]);


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
          dispatch(createBoard({ name }))
            .unwrap()
            .then((b) => setBoardId(b.id))
        }
      />

      {board && (
        <>
          <Board
            board={board}
            tasks={tasks}
            taskOps={{
              createTask: (data) => dispatch(createTask(data)).unwrap(),
              updateTask: (id, data) => dispatch(updateTask({ id, data })).unwrap(),
              deleteTask: (id) => dispatch(deleteTask({ id })).unwrap().then(() => undefined),
              reorder: (patches) => {
                dispatch(tasksActions.applyReorderOptimistic(patches));
                return dispatch(reorderTasks({ patches })).unwrap().then(() => undefined);
              },
            }}
            onEditBoard={() => setEditingBoard(true)}
            onDeleteBoard={() => setConfirmDelete(true)}
          />

          <BoardModal
            open={editingBoard}
            initialName={board.name}
            onClose={() => setEditingBoard(false)}
            onSubmit={(name) =>
              dispatch(updateBoard({ id: board.id, name }))
            }
          />

          {confirmDelete && (
            <ConfirmModal
              text={`Delete board "${board.name}"?`}
              onConfirm={() => {
                dispatch(deleteBoard({ id: board.id }));
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
