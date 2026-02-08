import { createPortal } from 'react-dom';
import styles from './Portal.module.css';

const modalRoot = document.getElementById('modal')!;

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Portal({ open, onClose, children }: Props) {
  if (!open) 
    return null;

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
}