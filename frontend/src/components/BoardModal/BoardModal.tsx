import { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  initialName?: string;
  onSubmit: (name: string) => void;
};

export function BoardModal({ open, onClose, initialName, onSubmit }: Props) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (initialName) {
      setName(initialName);
    } 
    else {
      setName('');
    }
  }, [initialName, open]);

  const handleSubmit = () => {
    onSubmit(name);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialName ? 'Edit board' : 'Create board'}
    >
      <input
        placeholder="Board name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {initialName ? 'Save' : 'Create'}
      </button>
    </Modal>
  );
}