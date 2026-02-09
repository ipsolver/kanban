import { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal';
import type { Task } from '../../types/task';
import modalStyles from '../Modal/Modal.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
  initialTask?: Task;
  onSubmit: (data: { title: string; description: string }) => void;
};

export function TaskModal({ open, onClose, initialTask, onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
    } 
    else {
      setTitle('');
      setDescription('');
    }
  }, [initialTask, open]);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) 
      return;
    onSubmit({ title, description });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialTask ? 'Edit task' : 'Create task'}
      footer={
        <div className={modalStyles.buttons}>
          <button className={modalStyles.secondary} onClick={onClose}>Cancel</button>
          <button className={modalStyles.primary} onClick={handleSubmit} disabled={!title.trim()}>
            {initialTask ? 'Save' : 'Create'}
          </button>
        </div>
      }
    >
      <div className={modalStyles.field}>
        <input
          className={modalStyles.input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={modalStyles.field}>
        <textarea
          className={modalStyles.textarea}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </Modal>
  );
}