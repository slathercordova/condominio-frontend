import { Button } from "../Button/Button";
import styles from "./ConfirmDialog.module.css";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title = "Confirmar acción",
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal}>
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>{message}</div>

        <div className={styles.actions}>
            <Button desc="Cancelar" modo="LNK" onClick={onCancel}/>
            <Button desc="Confirmar" modo="UPD" onClick={onConfirm}/>
        </div>
      </div>
    </div>
  );
}