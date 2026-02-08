import styles from './ConfirmModel.module.css';

type Props = {
  text: string;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmModal = ({ text, onConfirm, onClose }: Props) => (
  <div className={styles.modal}>
    <p>{text}</p>
    <div className={styles.buttons}>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  </div>
);
