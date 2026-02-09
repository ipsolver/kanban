import modalStyles from '../Modal/Modal.module.css';
import { Modal } from '../Modal/Modal';

type Props = {
  text: string;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmModal = ({ text, onConfirm, onClose }: Props) => (
   <Modal
    open
    onClose={onClose}
    title="Confirm"
    footer={
        <div className={modalStyles.buttons}>
          <button className={modalStyles.attention} onClick={onConfirm}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
    }
  >
    <p>{text}</p>
  </Modal>
);
