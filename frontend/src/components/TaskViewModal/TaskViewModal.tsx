import type { Task } from "../../types/task";
import { Modal } from "../Modal/Modal";

type Props = {
  task: Task | null;
  onClose: () => void;
};

export function TaskViewModal({ task, onClose }: Props) {
  if (!task) 
    return null;

  return (
    <Modal open={!!task} onClose={onClose} title={task.title}>
      <p>{task.description}</p>
    </Modal>
  );
}

