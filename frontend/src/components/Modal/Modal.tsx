import { Portal } from '../Portal/Portal';
import styles from './Modal.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export function Modal({ open, onClose, title, children }: Props) {
  return (
    <Portal open={open} onClose={onClose}>
      <div className={styles.modal}>
        {title && <h3 className={styles.title}>{title}</h3>}

        <div className={styles.modalBody}>
          {children}
        </div>

        <div className={styles.modalFooter}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </Portal>
  );
}