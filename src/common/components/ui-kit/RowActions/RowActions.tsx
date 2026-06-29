import styles from "./RowActions.module.css";
import { Button } from "../Button/Button";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface RowActionsProps {
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;

  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function RowActions({ onView, onEdit, onDelete }: RowActionsProps) {
  return (
    <div className={styles.container}>
      {onView && <Button icon={Eye} modo="DSP" title="Ver" onClick={onView} />}

      {onEdit && <Button icon={Pencil} modo="UPD" title="Editar" onClick={onEdit} />}

      {onDelete && <Button icon={Trash2} modo="DLT" title="Eliminar" onClick={onDelete} />}
    </div>
  );
}
