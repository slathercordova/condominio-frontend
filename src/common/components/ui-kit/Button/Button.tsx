import type { LucideIcon } from "lucide-react";
import styles from "./Button.module.css";

type EstadoBoton = "INS" | "UPD" | "DSP" | "DLT" | "LNK";

interface ButtonProps {
  desc?: string;
  icon?: LucideIcon;
  modo: EstadoBoton;
  onClick?: () => void;
  type?: "button" | "submit";
  title?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const stylesMap: Record<EstadoBoton, string> = {
  INS: styles.success,
  UPD: styles.primary,
  DSP: styles.secondary,
  DLT: styles.danger,
  LNK: styles.link,
};

export function Button({
  desc,
  icon: Icon,
  modo,
  onClick,
  type = "button",
  title,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const iconOnly = !!Icon && !desc;

  return (
    <button
      className={`${styles.btn} ${stylesMap[modo]} ${iconOnly ? styles.iconOnly : ""} ${fullWidth ? styles.fullWidth : ""}`}
      onClick={onClick}
      type={type}
      title={title}
      disabled={disabled}
    >
      {Icon && <Icon size={18} />}
      {desc && <span>{desc}</span>}
    </button>
  );
}
