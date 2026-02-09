import { Portal } from '../Portal/Portal';
import styles from './Modal.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function Modal({ open, onClose, title, children, footer }: Props) {
  return (
    <Portal open={open} onClose={onClose}>
      <div className={styles.modal}>
        <div className={styles.header}>
        {title && <h3 className={styles.title}>{title}</h3>}
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>

        {footer ? <div className={styles.modalFooter}>{footer}</div> : null}
      </div>
    </Portal>
  );
}