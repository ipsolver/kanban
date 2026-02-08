import { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal';
import type { Task } from '../../types/task';

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
    onSubmit({ title, description });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialTask ? 'Edit task' : 'Create task'}
    >
      <div>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {initialTask ? 'Save' : 'Create'}
        </button>
      </div>
    </Modal>
  );
}